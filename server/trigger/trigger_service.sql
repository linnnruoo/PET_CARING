CREATE OR REPLACE FUNCTION service_check()
RETURNS TRIGGER AS $$
DECLARE count NUMERIC;
DECLARE accepted NUMERIC;
BEGIN
	IF (TG_OP = 'INSERT') OR (TG_OP = 'UPDATE') THEN
		-- Find number of services by caretaker which overlaps
		SELECT COUNT(*) INTO count
		FROM services s
		WHERE s.sid <> NEW.sid
		AND s.id = NEW.id
		AND s.startTime <= NEW.endTime
		AND NEW.startTime <= s.endTime;
		-- Check if other services by caretaker overlaps
		IF count > 0 THEN
			RAISE NOTICE 'Pet type does not match the service!';
			RETURN NULL;
		-- Check if expected amount is not negative or null
		ELSE IF NEW.expected < 0 OR NEW.expected IS NULL THEN
			RAISE NOTICE 'Expected amount cannot be negative or null!'
			RETURN NULL;
		ELSE 
			RETURN NEW;
		END IF;
	ELSIF (TG_OP = 'DELETE') THEN
		-- Find whether service to be deleted has a accepted bid
		SELECT COUNT(*) INTO accepted
		FROM bids b
		WHERE b.sid = OLD.sid
		AND b.accepted = true
		-- Check if caretaker is removing service 1 day before it
		IF accepted > 0 AND OLD.startTime - CURRENT_TIMESTAMP < INTERVAL '1 DAY' THEN
			RAISE NOTICE 'You cannot cancel one day prior to an accepted service!';
			RETURN NULL;
		ELSE
			RETURN NEW;
		END IF;
	ELSE 
		RETURN NULL;
	END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER service_trigger 
BEFORE INSERT OR UPDATE OR DELETE
ON services
FOR EACH ROW
EXECUTE PROCEDURE service_check();

