CREATE OR REPLACE FUNCTION bid_check()
RETURNS TRIGGER AS $$
DECLARE checkValue NUMERIC;
DECLARE checkStartTime TIMESTAMP;
DECLARE checkEndTime TIMESTAMP;
BEGIN
	SELECT expected INTO checkValue
	FROM services s
	WHERE s.sid = NEW.sid;
	SELECT startTime INTO checkStartTime
	FROM services s
	WHERE s.sid = NEW.sid;
	SELECT endTime INTO checkEndTime
	FROM services s
	WHERE s.sid = NEW.sid;
	-- Check if pet type matches service pet type
	IF NOT EXISTS(SELECT 1
				  FROM services s 
				  WHERE s.sid = NEW.sid
				  AND EXISTS(
				  	SELECT 1
				  	FROM pets p
				  	WHERE p.id = NEW.id
				  	AND p.name = NEW.petName
				  	AND p.typeName = s.typeName)) THEN
		RAISE NOTICE 'Pet type does not match the service!';
		RETURN NULL;
	-- Check if pet is already in another accepted service 
	ELSIF EXISTS(SELECT 1
				 FROM bids b inner join services s on b.sid = s.sid
				 WHERE b.id = NEW.id
				 AND b.petName = NEW.petName
				 AND s.startTime <= checkEndTime
				 AND checkStartTime <= s.endTime
				 AND b.accepted = true) THEN
		RAISE NOTICE 'Pet is in another accepted service!';
		RETURN NULL;
	-- Check if bid amount is not negative or null
	ELSIF NEW.amount < 0 OR NEW.amount IS NULL THEN
		RAISE NOTICE 'Bid amount cannot be negative or null!';
		RETURN NULL;
	-- Automatically accept bid if bid amount exceed expected
	ELSEIF NEW.amount > checkValue THEN
		RAISE NOTICE 'Bid automatically accepted';
		NEW.accepted := true;
		RETURN NEW;
	ELSE 
		RETURN NEW;
	END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER bid_trigger 
BEFORE INSERT OR UPDATE
ON bids
FOR EACH ROW
EXECUTE PROCEDURE bid_check();