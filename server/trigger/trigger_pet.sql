CREATE OR REPLACE FUNCTION pet_check()
RETURNS TRIGGER AS $$
DECLARE count NUMERIC;
BEGIN
	SELECT COUNT(*) INTO count
	FROM petbreeds pb
	WHERE pb.typeName = NEW.typeName
	AND   pb.breedName = NEW.breedName
	;
	-- Check if pet breed matches pet type
	IF count = 0 THEN
		RAISE NOTICE 'Pet breed does not match the pet type!';
		RETURN NULL;
	-- Check if age is not negative or null
	ELSIF NEW.age < 0 OR NEW.age IS NULL THEN
		RAISE NOTICE 'Age cannot be negative or null!'
		RETURN NULL;
	ELSE 
		RETURN NEW;
	END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER pet_trigger 
BEFORE INSERT OR UPDATE
ON bids
FOR EACH ROW
EXECUTE PROCEDURE pet_check();
