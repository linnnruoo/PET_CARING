CREATE OR REPLACE FUNCTION rating_check()
RETURNS TRIGGER AS $$
DECLARE count NUMERIC;
BEGIN
	IF NOT EXISTS (SELECT 1 
				   FROM bids b inner join service s
				   ON b.sid = s.sid
				   WHERE b.id = NEW.oid
				   AND s.id = NEW.cid
				   AND b.accepted = true
				   AND s.endTime < CURRENT_TIMESTAMP)
		RAISE NOTICE 'You cannot rate a caretaker whom have not taken care of your pet'
		RETURN NULL;
	ELSE
		RETURN NEW;
	END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER rating_trigger 
BEFORE INSERT OR UPDATE
ON ratings
FOR EACH ROW
EXECUTE PROCEDURE rating_check();
