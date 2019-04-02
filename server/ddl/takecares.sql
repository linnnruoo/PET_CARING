drop table if exists takecares cascade;

create table takecares
(
  tcid          serial                              not null,
  startTime		timestamp							not null,
  endTime		timestamp							not null,
  pid			serial								not null,
  cid			serial								not null,
  primary key (tcid),
  foreign key (pid) references pets,
  foreign key (sid) references caretakers
);