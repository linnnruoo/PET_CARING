drop table if exists services cascade;

create table services
(
  sid           	serial                          not null,
  id				serial							not null,
  startTime			timestamp						not null,
  endTime			timestamp						not null,
  expected			int,
  type				serial,
  primary key (sid),
  foreign key (type) references pettypes,
  foreign key (id) references caretakers 
);