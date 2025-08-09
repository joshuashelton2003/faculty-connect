# Backend API Requirements

This document outlines the backend API endpoints needed to support the updated dashboard features.

## Authentication Endpoints

### Sign Out

- **Route**: `POST /api/auth/logout`
- **Purpose**: Clear user session/tokens and sign out
- **Implementation**: Clear JWT tokens, session data, and redirect to login

## User Profile Endpoints

### Faculty Profile

- **Route**: `GET /api/faculty/profile`
- **Purpose**: Fetch detailed faculty profile information
- **Response Structure**:
  ```json
  {
    "id": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "profileImage": "string",
    "department": "string",
    "qualification": "string",
    "skills": ["string"],
    "bio": "string",
    "joinedDate": "string",
    "lastLogin": "string",
    "experience": "string",
    "currentInstitution": "string"
  }
  ```

### Institution Profile

- **Route**: `GET /api/institution/profile`
- **Purpose**: Fetch detailed institution profile information
- **Response Structure**:
  ```json
  {
    "id": "string",
    "institutionName": "string",
    "contactPersonName": "string",
    "email": "string",
    "phone": "string",
    "logo": "string",
    "address": "string",
    "website": "string",
    "establishedYear": "number",
    "institutionType": "string",
    "description": "string",
    "joinedDate": "string",
    "lastLogin": "string",
    "totalJobs": "number",
    "activeJobs": "number"
  }
  ```

### Update Profile

- **Route**: `PUT /api/profile`
- **Purpose**: Update user profile information
- **Request Body**: Profile data fields
- **Response**: Updated profile object

## Notifications Endpoints

### Get Notifications

- **Route**: `GET /api/notifications`
- **Purpose**: Fetch user notifications with pagination
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 20)
  - `type`: Filter by notification type
  - `isRead`: Filter by read status
- **Response Structure**:
  ```json
  {
    "notifications": [
      {
        "id": "string",
        "type": "application|interview|job-match|message|system",
        "title": "string",
        "message": "string",
        "timestamp": "string",
        "isRead": "boolean",
        "actionUrl": "string",
        "priority": "low|medium|high"
      }
    ],
    "totalCount": "number",
    "unreadCount": "number"
  }
  ```

### Mark Notification as Read

- **Route**: `PUT /api/notifications/:id/read`
- **Purpose**: Mark a specific notification as read

### Mark All Notifications as Read

- **Route**: `PUT /api/notifications/mark-all-read`
- **Purpose**: Mark all user notifications as read

### Delete Notification

- **Route**: `DELETE /api/notifications/:id`
- **Purpose**: Delete a specific notification

## Settings Endpoints

### Get User Settings

- **Route**: `GET /api/settings`
- **Purpose**: Fetch user preferences and settings
- **Response Structure**:
  ```json
  {
    "notifications": {
      "emailNotifications": "boolean",
      "pushNotifications": "boolean",
      "jobAlerts": "boolean",
      "applicationUpdates": "boolean",
      "messageNotifications": "boolean",
      "weeklyDigest": "boolean"
    },
    "security": {
      "twoFactorAuth": "boolean",
      "profileVisibility": "public|private",
      "showContactInfo": "boolean"
    },
    "preferences": {
      "darkMode": "boolean",
      "language": "string"
    }
  }
  ```

### Update User Settings

- **Route**: `PUT /api/settings`
- **Purpose**: Update user preferences and settings
- **Request Body**: Settings object
- **Response**: Updated settings object

### Change Password

- **Route**: `PUT /api/settings/password`
- **Purpose**: Change user password
- **Request Body**:
  ```json
  {
    "currentPassword": "string",
    "newPassword": "string"
  }
  ```

## File Upload Endpoints

### Upload Profile Image

- **Route**: `POST /api/upload/profile-image`
- **Purpose**: Upload and update user profile image
- **Request**: Multipart form data with image file
- **Response**:
  ```json
  {
    "imageUrl": "string",
    "message": "Profile image updated successfully"
  }
  ```

## Real-time Features (Optional)

### WebSocket Connections

- **Route**: `WS /api/ws/notifications`
- **Purpose**: Real-time notification delivery
- **Implementation**: Send new notifications to connected users instantly

## Error Handling

All endpoints should return consistent error responses:

```json
{
  "error": "string",
  "message": "string",
  "statusCode": "number"
}
```

## Authentication

All protected endpoints require:

- **Header**: `Authorization: Bearer <JWT_TOKEN>`
- **Validation**: Verify token and extract user information

## Rate Limiting

Implement rate limiting for:

- **Authentication endpoints**: 5 requests per minute
- **Upload endpoints**: 10 requests per hour
- **General API endpoints**: 100 requests per minute

## Data Validation

Use input validation for:

- **Email formats**: Valid email regex
- **Password strength**: Minimum 6 characters
- **File uploads**: Image formats only (jpg, png, gif)
- **Profile data**: Required fields validation

## Security Considerations

1. **CORS**: Configure proper CORS settings
2. **CSRF Protection**: Implement CSRF tokens for state-changing operations
3. **Input Sanitization**: Sanitize all user inputs
4. **Password Hashing**: Use bcrypt for password storage
5. **JWT Security**: Implement proper token expiration and refresh

## Database Schema Updates

### Users Table

Add columns:

- `last_login` (timestamp)
- `profile_completion` (integer)
- `bio` (text)
- `skills` (JSON array)

### Notifications Table

Create new table:

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  action_url VARCHAR(500),
  priority VARCHAR(10) DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Settings Table

Create new table:

```sql
CREATE TABLE user_settings (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) UNIQUE,
  notification_preferences JSONB,
  security_settings JSONB,
  general_preferences JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Implementation Priority

1. **High Priority**:

   - Authentication (sign out)
   - Basic profile endpoints
   - Notifications CRUD

2. **Medium Priority**:

   - Settings management
   - File upload
   - Profile image updates

3. **Low Priority**:
   - Real-time notifications
   - Advanced filtering
   - Analytics endpoints

This API structure supports all the frontend features implemented in the dashboard updates.
