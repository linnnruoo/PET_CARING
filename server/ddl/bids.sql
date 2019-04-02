drop table if exists bids cascade;

create table bids
(
  id				serial							not null,
  sid				serial							not null,
  amount			int								not null,
  petName			varchar(100)					not null,
  accepted			boolean,
  primary key (id, sid, petName),
  foreign key (id) references owners,
  foreign key (sid) references services,
  foreign key (petName) references pets 
);