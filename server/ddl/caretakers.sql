drop table if exists caretakers cascade;

create table caretakers
(
  id           serial                              not null,
  primary key (id),
  foreign key (id) references users
);