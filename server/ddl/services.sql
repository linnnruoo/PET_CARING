drop table if exists services cascade;

create table services
(
  sid           	serial                          not null,
  id				int							not null,
  title       varchar(500),
  startTime			timestamp						not null,
  endTime			timestamp						not null,
  expected			int,
  typeName			varchar(100),
  primary key (sid),
  foreign key (typeName) references pettypes,
  foreign key (id) references caretakers 
);