drop table if exists petbreeds cascade;

create table petbreeds
(
  breedName			varchar(100)						not null,
  typeName			varchar(100)						not null,
  primary key (breedName, typeName),
  foreign key (typeName) references pettypes
);