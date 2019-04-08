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

DROP VIEW IF EXISTS BidsView;

CREATE VIEW BidsView AS    
	SELECT b.id, b.sid, b.amount, b.petname, 
    	CASE 
          WHEN b.accepted
          THEN 'accepted'
          WHEN NOT EXISTS (SELECT 1 FROM bids b2 WHERE b.sid = b2.sid and b2.accepted)
          THEN 'pending'  
          ELSE 'rejected'
        END AS status
	FROM bids b;
	