CREATE OR REPLACE FUNCTION bid_check()
RETURNS TRIGGER AS $$
DECLARE count NUMERIC;
DECLARE count2 NUMERIC;
DECLARE checkValue NUMERIC;
BEGIN
	SELECT COUNT(*) INTO count
	FROM services s
	WHERE s.sid = NEW.sid
	AND exists (
		SELECT 1
		FROM pets p
		WHERE p.id = NEW.id
		AND p.name = NEW.petName
		AND p.typeName = s.typeName
	);

	SELECT COUNT(*) INTO count2
	FROM bids b inner join services s on b.sid = s.sid
	WHERE b.id = NEW.id 
	AND b.petName = NEW.petName
	AND s.startTime <= NEW.endTime
	AND NEW.startTime <= s.endTime
	AND b.accepted = true;

	SELECT expected INTO checkValue
	FROM services s
	WHERE s.sid = NEW.sid;

	-- Check if bid is modified after accepted
	IF TG_OP = 'UPDATE' AND OLD.accepted = true AND (OLD.amount <> NEW.amount OR OLD.petName <> NEW.petName) THEN
		RAISE NOTICE 'You can not update your bid after it is accepted!';
		RETURN NULL;
	-- Check if pet type matches service pet type
	ELSIF count = 0 THEN
		RAISE NOTICE 'Pet type does not match the service!';
		RETURN NULL;
	-- Check if pet is already in another accepted service 
	ELSIF count2 = 0 THEN
		RAISE NOTICE 'Pet is in another accepted service!';
		RETURN NULL;
	-- Check if bid amount is not negative or null
	ELSIF NEW.amount < 0 OR NEW.amount IS NULL THEN
		RAISE NOTICE 'Bid amount cannot be negative or null!';
		RETURN NULL;
	-- Check if pet belongs to owner		
	ELSIF EXISTS (SELECT 1 FROM pets p WHERE p.id = NEW.id AND p.id = NEW.petName) THEN
		RAISE NOTICE 'Pet does not belong to owner!';
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

