drop table if exists services cascade;

create table services
(
  sid           	serial                          not null,
  startTime			timestamp						not null,
  endTime			timestamp						not null,
  type				serial,
  primary key (sid),
  foreign key (type) references pettypes 
);