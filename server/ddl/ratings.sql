drop table if exists ratings cascade;

create table ratings
(
  oid           int                              not null,
  cid           int                              not null,
  value			int								 not null,
  primary key (oid, cid),
  foreign key (oid) references owners(id),
  foreign key (cid) references caretakers(id)
);