drop table if exists pettypes cascade;

create table pettypes
(
  typeName			varchar(100)						not null,
  primary key (typeName)
);