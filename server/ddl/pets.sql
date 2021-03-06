drop table if exists pets cascade;

create table pets
(
  name			varchar(100)						not null,
  id			int								not null,
  typeName		varchar(100),
  breedName		varchar(100),
  age			int,
  gender		gender,
  primary key (name, id),
  foreign key (id) references owners,
  foreign key (breedName) references petbreeds
);