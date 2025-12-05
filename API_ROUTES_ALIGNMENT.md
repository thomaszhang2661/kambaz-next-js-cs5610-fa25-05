# Kambaz Quiz API Routes Alignment

**Date:** 2025-12-04  
**Status:** ✅ Complete (Spec-Compliant + Backwards Compatible)

## Overview

The Quizzes API has been refactored to align with the assignment specification while maintaining backwards compatibility. All routes are now available on **both** the spec-compliant path and the legacy path.

## Route Mapping

### 1. List Quizzes for a Course

| Spec Path (Primary)         | Legacy Path | Method | Auth         | Handler             |
| --------------------------- | ----------- | ------ | ------------ | ------------------- |
| `/api/courses/:cid/quizzes` | N/A         | GET    | requireLogin | getQuizzesForCourse |

**Behavior:**

- Faculty: Returns all quizzes for the course (published & unpublished)
- Students: Filters to published quizzes that are currently available (respects `availableDate` and `untilDate`)

---

### 2. Create Quiz

| Spec Path (Primary)         | Legacy Path | Method | Auth           | Handler    |
| --------------------------- | ----------- | ------ | -------------- | ---------- |
| `/api/courses/:cid/quizzes` | N/A         | POST   | requireFaculty | createQuiz |

**Behavior:**

- Faculty only
- Creates a new quiz under the specified course
- Assigns `createdBy` to the current user

---

### 3. Get Quiz by ID

| Spec Path (Primary)              | Legacy Path         | Method | Auth         | Handler     |
| -------------------------------- | ------------------- | ------ | ------------ | ----------- |
| `/api/courses/:cid/quizzes/:qid` | `/api/quizzes/:qid` | GET    | requireLogin | getQuizById |

**Behavior:**

- Faculty: Can view any quiz (published or unpublished)
- Students: Can only view published quizzes (403 Forbidden if unpublished)

---

### 4. Update Quiz

| Spec Path (Primary)              | Legacy Path         | Method | Auth           | Handler    |
| -------------------------------- | ------------------- | ------ | -------------- | ---------- |
| `/api/courses/:cid/quizzes/:qid` | `/api/quizzes/:qid` | PUT    | requireFaculty | updateQuiz |

**Behavior:**

- Faculty only
- Updates quiz metadata and questions

---

### 5. Delete Quiz

| Spec Path (Primary)              | Legacy Path         | Method | Auth           | Handler    |
| -------------------------------- | ------------------- | ------ | -------------- | ---------- |
| `/api/courses/:cid/quizzes/:qid` | `/api/quizzes/:qid` | DELETE | requireFaculty | deleteQuiz |

**Behavior:**

- Faculty only
- Permanently deletes the quiz

---

### 6. Publish Quiz

| Spec Path (Primary)                      | Legacy Path                 | Method | Auth           | Handler     |
| ---------------------------------------- | --------------------------- | ------ | -------------- | ----------- |
| `/api/courses/:cid/quizzes/:qid/publish` | `/api/quizzes/:qid/publish` | POST   | requireFaculty | publishQuiz |

**Behavior:**

- Faculty only
- Sets `published: true`, records `publishedBy` and `publishedAt`
- Clears `unpublishedBy` and `unpublishedAt`

---

### 7. Unpublish Quiz

| Spec Path (Primary)                        | Legacy Path                   | Method | Auth           | Handler       |
| ------------------------------------------ | ----------------------------- | ------ | -------------- | ------------- |
| `/api/courses/:cid/quizzes/:qid/unpublish` | `/api/quizzes/:qid/unpublish` | POST   | requireFaculty | unpublishQuiz |

**Behavior:**

- Faculty only
- Sets `published: false`, records `unpublishedBy` and `unpublishedAt`

---

### 8. Submit Quiz Attempt

| Spec Path (Primary)                       | Legacy Path                  | Method | Auth         | Handler           |
| ----------------------------------------- | ---------------------------- | ------ | ------------ | ----------------- |
| `/api/courses/:cid/quizzes/:qid/attempts` | `/api/quizzes/:qid/attempts` | POST   | requireLogin | submitQuizAttempt |

**Behavior:**

- Students & Faculty
- Validates quiz is published (students only)
- Checks attempt limits (`multipleAttempts`, `maxAttempts`)
- Scores the attempt using:
  - **MCQ:** Matches student answer ID to correct choice ID
  - **True/False:** Compares boolean values
  - **Fill-in-the-blank:** Case-insensitive match against any accepted answer in any blank
- Persists attempt with answers, score, and `attemptNumber`
- Returns: `{ attempt, score, total }`

---

### 9. Get Attempts for a Quiz

| Spec Path (Primary)                       | Legacy Path                  | Method | Auth         | Handler     |
| ----------------------------------------- | ---------------------------- | ------ | ------------ | ----------- |
| `/api/courses/:cid/quizzes/:qid/attempts` | `/api/quizzes/:qid/attempts` | GET    | requireLogin | getAttempts |

**Behavior:**

- Faculty: Returns all attempts for the quiz (all students)
- Students: Returns only their own attempts
- **Note:** Faculty can use this endpoint to review student submissions

---

### 10. Get Single Attempt by ID

| Spec Path (Primary)                            | Legacy Path                       | Method | Auth         | Handler        |
| ---------------------------------------------- | --------------------------------- | ------ | ------------ | -------------- |
| `/api/courses/:cid/quizzes/:qid/attempts/:aid` | `/api/quizzes/:qid/attempts/:aid` | GET    | requireLogin | getAttemptById |

**Behavior:**

- Faculty: Can retrieve any attempt for any student
- Students: Can only retrieve their own attempts (403 Forbidden if they try to access another student's)
- Returns attempt details including answers and score

---

## Backwards Compatibility

✅ **All legacy routes** (`/api/quizzes/:qid/*`) remain fully functional.  
✅ **Existing smoke tests and client code** continue to work without modification.  
✅ **New specification paths** (`/api/courses/:cid/quizzes/*`) are now also supported.

### Migration Path

Frontend developers can migrate to the spec-compliant paths at their convenience:

- Old: `GET /api/quizzes/abc123`
- New: `GET /api/courses/course1/quizzes/abc123`

Both will return identical responses.

---

## Implementation Details

### Code Organization

All route handlers are extracted as independent async functions in the **handler functions** section, then registered on both paths:

```javascript
// Handler (single implementation)
const getQuizById = async (req, res) => { ... };

// Route registration (both paths)
app.get("/api/courses/:cid/quizzes/:qid", requireLogin,
  (req, res) => getQuizById(req, res)
);
app.get("/api/quizzes/:qid", requireLogin, getQuizById);
```

This pattern eliminates code duplication and ensures consistent behavior across both paths.

### Error Handling

All routes follow consistent HTTP status codes:

- `200 OK` - Successful GET/PUT/DELETE/POST
- `400 Bad Request` - Invalid input (e.g., "Username already taken")
- `401 Unauthorized` - Not logged in
- `403 Forbidden` - Insufficient permissions (e.g., student trying to unpublish, student accessing unpublished quiz)
- `404 Not Found` - Quiz/attempt does not exist
- `422 Unprocessable Entity` - Business rule violation (e.g., "Exceeded max attempts")

---

## Testing Recommendations

### Using Spec Paths

```bash
# Create quiz (spec path)
curl -b faculty_cookie.txt -X POST \
  -H "Content-Type: application/json" \
  -d '{"title":"My Quiz","questions":[]}' \
  http://localhost:3000/api/courses/course1/quizzes

# Get quiz (spec path)
curl -b faculty_cookie.txt \
  http://localhost:3000/api/courses/course1/quizzes/quiz123

# Get attempts (spec path)
curl -b faculty_cookie.txt \
  http://localhost:3000/api/courses/course1/quizzes/quiz123/attempts
```

### Using Legacy Paths (Backwards Compatibility)

```bash
# Get quiz (legacy path - still works!)
curl -b faculty_cookie.txt \
  http://localhost:3000/api/quizzes/quiz123

# Get attempts (legacy path - still works!)
curl -b faculty_cookie.txt \
  http://localhost:3000/api/quizzes/quiz123/attempts
```

### Running Smoke Tests

The existing `smoke-test-quizzes.sh` script uses legacy paths and should continue to work:

```bash
./smoke-test-quizzes.sh http://localhost:3000 course_id
```

---

## Future Enhancements

1. **Pagination for attempts** - Add `?page=1&limit=20` to `GET .../attempts`
2. **Filtering by student** - Add `?studentId=user123` to `GET .../attempts` (faculty only)
3. **Advanced scoring** - Support multi-select, partial credit, per-blank scoring
4. **Attempt history** - Endpoint to list all attempts with summary scores
5. **Analytics** - Faculty endpoint to view class statistics

---

## Summary

✅ Quizzes API is now **specification-compliant** with all required endpoints  
✅ **Backwards compatibility** maintained for existing code  
✅ **DRY** handler implementation eliminates code duplication  
✅ **Consistent** error handling and response formats  
✅ **Role-based access control** enforced at middleware level  
✅ **Ready for production** or further enhancement
