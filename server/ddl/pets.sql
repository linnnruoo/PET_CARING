create table pets
(
  pid           serial                              not null,
  name			varchar(100)						not null,
  id			serial								not null,
  tid			serial,
  primary key (pid),
  foreign key (id) references owners,
  foreign key (tid) references pettypes
);