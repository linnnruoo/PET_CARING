create table user_roles
(
  id   serial       not null,
  name varchar(200) not null,
  constraint user_roles_pk
    primary key (id)
);

create unique index user_roles_name_uindex
  on user_roles (name);


