COPY shoes(name,model)
FROM '/Users/Maggie/Desktop/HackReactor/sdc/somebirdsColorAndSizeSelection/db/shoes.csv'
DELIMITER ','
CSV HEADER;

COPY colors(name,shoe_color,sole_color,shoe_hex,sole_hex,limited)
FROM '/Users/Maggie/Desktop/HackReactor/sdc/somebirdsColorAndSizeSelection/db/colors.csv'
DELIMITER ','
CSV HEADER;

COPY shoecolors(shoe_id, color_id)
FROM '/Users/Maggie/Desktop/HackReactor/sdc/somebirdsColorAndSizeSelection/db/shoecolors.csv'
DELIMITER ' '
CSV HEADER;

COPY shoecolors(shoe_id, color_id)
FROM '/Users/Maggie/Desktop/HackReactor/sdc/somebirdsColorAndSizeSelection/db/shoecolors_women.csv'
DELIMITER ' '
CSV HEADER;

COPY quantities(shoe_id, color_id, quantity)
FROM '/Users/Maggie/Desktop/HackReactor/sdc/somebirdsColorAndSizeSelection/db/quantity.csv'
DELIMITER ' '
CSV HEADER;

COPY quantities(shoe_id, color_id, quantity)
FROM '/Users/Maggie/Desktop/HackReactor/sdc/somebirdsColorAndSizeSelection/db/quantity_women.csv'
DELIMITER ' '
CSV HEADER;