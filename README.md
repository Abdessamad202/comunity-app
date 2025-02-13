# Community App .

## this app is a community where peaple can speak and find there intrest and have peaple shere the same intrest.

the app containe

- user authenticatiion
  - forget password
  - create account
  - login
  - facebook
  - google
- profile modification :

  - name
  - sex (M/F)
  - picture (depends on sex)
  - intrest (null) (for freinds or groups recommendations )
  - description (adding a default despction)
  - social links (optional)
  - post or study (optional) (for finding commun porson for the user )
  - address .

- settings :
  - notifications .
  - language .
  -
  -
- groups
  - create group
  - goin group
  - follow group
  - (private/public)
  - share content (photos,vedios,questions).
- Newsfeed :
  - shows last updates (groups / freinds).
  - reacting (like / comments / share / report)
  - suggetion for users .
- activities :
  create activities and chanllenges in groups .
  (the one how create the activity and get accept by the admin with get start in his account related on the group if he get 15 ⭐ he will be active mumbre / 20 ⭐ he can be an admin anytime ... )
  - goin the activity
  - comments / likes
  - result and statistics
- Direct Messaging :
  - single chat (between freinds).
  - multipule chat (between group of peaple).
  - Push notifications: Notifications for every new message or interaction.
- Voting & Polls :
  - create Voting & Polls between users in groups
  - users can vote .
- Notifications and Alerts :
  - Notifications about new activities, updates in groups, and private messages.
  - Alerts about upcoming events or challenges."
- Advanced Search :
  - search for users , groups with multipule filters .
- save publications .
- code table (mail / code / created_at)

### **Community App Database Structure**

#### **1. Users Table**

| Column Name             | Data Type      | Constraints                         |
| ----------------------- | -------------- | ----------------------------------- |
| `id`                    | INT            | PRIMARY KEY, AUTO_INCREMENT         |
| `name`                  | VARCHAR(255)   | NOT NULL                            |
| `email`                 | VARCHAR(255)   | UNIQUE, NOT NULL                    |
| `password`              | VARCHAR(255)   | NOT NULL                            |
| `sex`                   | ENUM('M', 'F') | NOT NULL                            |
| `profile_picture`       | VARCHAR(255)   | NULLABLE                            |
| `interests`             | JSON           | NULLABLE                            |
| `description`           | TEXT           | DEFAULT 'Welcome to my profile!'    |
| `social_links`          | JSON           | NULLABLE                            |
| `job`                   | varchar        | NULLABLE                            |
| `address`               | VARCHAR(255)   | NULLABLE                            |
| `language`              | VARCHAR(10)    | DEFAULT 'en'                        |
| `notifications_enabled` | BOOLEAN        | DEFAULT TRUE                        |
| `created_at`            | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP           |
| `updated_at`            | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP ON UPDATE |

---

#### **2. Groups Table**

| Column Name   | Data Type                 | Constraints                         |
| ------------- | ------------------------- | ----------------------------------- |
| `id`          | INT                       | PRIMARY KEY, AUTO_INCREMENT         |
| `name`        | VARCHAR(255)              | NOT NULL                            |
| `description` | TEXT                      | NOT NULL                            |
| `privacy`     | ENUM('public', 'private') | DEFAULT 'public'                    |
| `creator_id`  | INT                       | FOREIGN KEY (Users.id)              |
| `created_at`  | TIMESTAMP                 | DEFAULT CURRENT_TIMESTAMP           |
| `updated_at`  | TIMESTAMP                 | DEFAULT CURRENT_TIMESTAMP ON UPDATE |

---

#### **3. Posts Table**

| Column Name  | Data Type                | Constraints                     |
| ------------ | ------------------------ | ------------------------------- |
| `id`         | INT                      | PRIMARY KEY, AUTO_INCREMENT     |
| `group_id`   | INT                      | FOREIGN KEY (Groups.id)         |
| `user_id`    | INT                      | FOREIGN KEY (Users.id)          |
| `content`    | TEXT                     | NOT NULL                        |
| `media`      | JSON                     | NULLABLE (photos, videos, etc.) |
| `type`       | ENUM('post', 'question') | DEFAULT 'post'                  |
| `created_at` | TIMESTAMP                | DEFAULT CURRENT_TIMESTAMP       |

---

#### **4. Comments Table**

| Column Name  | Data Type | Constraints                 |
| ------------ | --------- | --------------------------- |
| `id`         | INT       | PRIMARY KEY, AUTO_INCREMENT |
| `post_id`    | INT       | FOREIGN KEY (Posts.id)      |
| `user_id`    | INT       | FOREIGN KEY (Users.id)      |
| `content`    | TEXT      | NOT NULL                    |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP   |

---

#### **5. Activities Table**

| Column Name   | Data Type    | Constraints                 |
| ------------- | ------------ | --------------------------- |
| `id`          | INT          | PRIMARY KEY, AUTO_INCREMENT |
| `group_id`    | INT          | FOREIGN KEY (Groups.id)     |
| `creator_id`  | INT          | FOREIGN KEY (Users.id)      |
| `name`        | VARCHAR(255) | NOT NULL                    |
| `description` | TEXT         | NOT NULL                    |
| `start_date`  | DATE         | NOT NULL                    |
| `end_date`    | DATE         | NOT NULL                    |
| `stars`       | INT          | DEFAULT 0                   |
| `created_at`  | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP   |

---

#### **6. Direct Messages Table**

| Column Name   | Data Type | Constraints                 |
| ------------- | --------- | --------------------------- |
| `id`          | INT       | PRIMARY KEY, AUTO_INCREMENT |
| `sender_id`   | INT       | FOREIGN KEY (Users.id)      |
| `receiver_id` | INT       | FOREIGN KEY (Users.id)      |
| `content`     | TEXT      | NOT NULL                    |
| `created_at`  | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP   |

---

#### **7. Polls Table**

| Column Name  | Data Type | Constraints                 |
| ------------ | --------- | --------------------------- |
| `id`         | INT       | PRIMARY KEY, AUTO_INCREMENT |
| `group_id`   | INT       | FOREIGN KEY (Groups.id)     |
| `question`   | TEXT      | NOT NULL                    |
| `options`    | JSON      | NOT NULL                    |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP   |

---

#### **8. Votes Table**

| Column Name  | Data Type    | Constraints                 |
| ------------ | ------------ | --------------------------- |
| `id`         | INT          | PRIMARY KEY, AUTO_INCREMENT |
| `poll_id`    | INT          | FOREIGN KEY (Polls.id)      |
| `user_id`    | INT          | FOREIGN KEY (Users.id)      |
| `vote`       | VARCHAR(255) | NOT NULL                    |
| `created_at` | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP   |

---

#### **9. Saved Publications Table**

| Column Name  | Data Type | Constraints                 |
| ------------ | --------- | --------------------------- |
| `id`         | INT       | PRIMARY KEY, AUTO_INCREMENT |
| `user_id`    | INT       | FOREIGN KEY (Users.id)      |
| `post_id`    | INT       | FOREIGN KEY (Posts.id)      |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP   |

---

### **Next Steps**

1. **Backend Development:**

   - Start by creating user authentication and authorization using JWT.
   - Implement CRUD operations for groups, posts, and activities.

2. **Frontend Development:**

   - Design a simple UI for registration, login, and newsfeed.
   - Use **React.js** and **Tailwind CSS** for styling.

3. **Integrations:**
   - Add Facebook and Google sign-in.
   - Implement push notifications using **Firebase**.

// step 1- verification
// step 2- implement the personal data (name, password,sex,profile,intrest ...)
// step 3 - get ready.
// use triggers to change the state for each step