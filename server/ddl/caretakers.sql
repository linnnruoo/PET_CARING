create table caretakers
(
  id           serial                              not null,
  primary key (id),
  foreign key (id) references users
);