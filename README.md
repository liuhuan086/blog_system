## 博客系统学习与实践之路

### 建表语句
```sql
CREATE TABLE `react_blog`.`blog_content` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` TEXT NOT NULL,
  `introduce` TEXT NOT NULL,
  `type` VARCHAR(255) NULL,
  `title` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));
```

```sql
INSERT INTO type (`id`, `typeName`, `order_num`, `icon`) VALUES ('1', '视频教程', '1', 'youtube');
INSERT INTO type (`id`, `typeName`, `order_num`, `icon`) VALUES ('2', '快乐生活', '2', 'smile');

```

```sql
CREATE TABLE `react_blog`.`article` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `type_id` INT NOT NULL,
  `article_content` TEXT NOT NULL,
  `introduce` TEXT NOT NULL,
  `view_count` INT NOT NULL,
  `add_time` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));

```

```sql
CREATE TABLE `react_blog`.`type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `typeName` VARCHAR(255) NOT NULL,
  `orderNum` VARCHAR(255) NOT NULL,
  `icon` VARCHAR(128) NOT NULL,
  PRIMARY KEY (`id`));

```

```sql
CREATE TABLE `react_blog`.`admin_user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));

```

```sql
CREATE TABLE `react_blog`.`blog_content` (
  `id` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `introduce` TEXT NOT NULL,
  `content` TEXT NOT NULL,
  `type` VARCHAR(128) NOT NULL,
  PRIMARY KEY (`id`));

```

