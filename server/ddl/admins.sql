drop table if exists admins cascade;

create table admins
(
  id           serial                              not null,
  primary key (id),
  foreign key (id) references users
);
