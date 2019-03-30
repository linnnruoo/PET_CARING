create table owners
(
  id           serial                              not null,
  primary key (id),
  foreign key (id) references users
);