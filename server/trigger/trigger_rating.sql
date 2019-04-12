CREATE OR REPLACE FUNCTION rating_check()
RETURNS TRIGGER AS $$
DECLARE count NUMERIC;
BEGIN
	-- Check if owner can rate caretaker
	IF NOT EXISTS (SELECT 1 
				   FROM bids b inner join service s
				   ON b.sid = s.sid
				   WHERE b.id = NEW.oid
				   AND s.id = NEW.cid
				   AND b.accepted = true
				   AND s.endTime < CURRENT_TIMESTAMP) THEN
		RAISE NOTICE 'You cannot rate a caretaker whom have not finished taking care of your pet';
		RETURN NULL;
	-- Check rating value
	ELSIF NEW.value > 5 OR NEW.value < 0 THEN
		RAISE NOTICE 'Rating must be between 0 and 5.';
		RETURN NULL;
	ELSE
		RETURN NEW;
	END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER rating_trigger 
BEFORE INSERT
ON ratings
FOR EACH ROW
EXECUTE PROCEDURE rating_check();
