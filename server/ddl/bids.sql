drop table if exists bids cascade;

create table bids
(
  id				int							not null,
  sid				int							not null,
  amount			int								not null,
  petName			varchar(100)					not null,
  accepted			boolean							default FALSE,
  primary key (id, sid, petName),
  foreign key (id) references owners,
  foreign key (sid) references services,
  foreign key (petName, id) references pets 
);