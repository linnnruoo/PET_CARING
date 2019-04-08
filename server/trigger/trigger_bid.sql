CREATE OR REPLACE FUNCTION bid_check()
RETURNS TRIGGER AS $$
DECLARE count NUMERIC;
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
	-- Check if bid is modified after accepted
	IF TG_OP = 'UPDATE' AND OLD.accepted = true AND (OLD.amount <> NEW.amount OR OLD.petName <> NEW.petName)
		RAISE NOTICE 'You can not update your bid after it is accepted!';
		RETURN NULL;
	-- Check if pet type matches service pet type
	ELSIF count = 0 THEN
		RAISE NOTICE 'Pet type does not match the service!';
		RETURN NULL;
	-- Check if bid amount is not negative or null
	ELSIF NEW.amount < 0 OR NEW.amount IS NULL THEN
		RAISE NOTICE 'Bid amount cannot be negative or null!'
		RETURN NULL;
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

