create table users
(
  id           serial                              not null,
  email        varchar(200)                        not null,
  password     varchar(100)                        not null,
  verified     boolean   default false,
  created_date timestamp default CURRENT_TIMESTAMP not null,
  first_name   varchar(200)                        not null,
  last_name    varchar(200)                        not null,
  role_id      integer                             not null,
  constraint users_pk
    primary key (id),
  constraint users_user_roles_id_fk
    foreign key (role_id) references user_roles
);

create unique index users_email_uindex
  on users (email);


