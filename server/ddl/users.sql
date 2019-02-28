create table users
(
  id           serial                              not null,
  email        varchar(200)                        not null,
  password     varchar(100)                        not null,
  verified     boolean   default false,
  created_date timestamp default CURRENT_TIMESTAMP not null,
  constraint users_pk
    primary key (id)
);

alter table users
  owner to pfxsxzltwkkuzz;

create unique index users_email_uindex
  on users (email);

