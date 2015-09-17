-- Name: dataset;
CREATE TABLE dataset (
    id_record serial,
    id_city integer,
	IntersSemafor double precision,
	OV_Tra_Niv double precision,
	ObraVial_Bacheo double precision,
	OV_Acarreo double precision,
	OV_Sumin double precision,
	PrecioUnitarioBacheoProfundo double precision,
	FactorUnitarioBacheoProfundo double precision,
	PrecioUnitarioBacheoSuperficial double precision,
	FactorUnitarioBacheoSuperficial double precision,
	PrecioUnitarioBacheoPromedio double precision,
	FactorUnitarioBacheoPromedio double precision,
	RenivBrocPozo double precision,
	SumInstalRejilla double precision,
	RenivColadera double precision,
	LevantPoligonal double precision,
	DemolManual double precision,
	CargaM3 double precision,
	AcarreoM3 double precision,
	PinturaDelimitacion double precision,
	Conf_Chapu double precision,
	Conf_Reforma double precision,
	SenalVertPreventiva double precision,
	SenalVertRestrictiva double precision,
	SenalHorizSOLO double precision,
	SenalHorizPintVerde double precision,
	SenalHorizComplement double precision,
	Bolardo double precision,
	GuiasTactiles double precision,
	Banqueta double precision,
	Biciestacionamientos double precision,
    status boolean DEFAULT true
);
COMMENT ON COLUMN dataset.IntersSemafor IS 'DGrales_InterseccionSemaforizada';
COMMENT ON COLUMN dataset.OV_Tra_Niv IS 'ObraVial_Trazo_y_nivelacion';
COMMENT ON COLUMN dataset.ObraVial_Bacheo IS 'profundo con concreto asfaltico';
COMMENT ON COLUMN dataset.OV_Acarreo IS 'ObraVial_Acarreo en camion';
COMMENT ON COLUMN dataset.OV_Sumin IS 'ObraVial_Suministro y colocación de sello asfaltico o slurry seal tipo ii a base de emulsión y arena bien graduada';
COMMENT ON COLUMN dataset.PrecioUnitarioBacheoProfundo IS 'PUBP';
COMMENT ON COLUMN dataset.FactorUnitarioBacheoProfundo IS 'FUBP';
COMMENT ON COLUMN dataset.PrecioUnitarioBacheoSuperficial IS 'PUBS';
COMMENT ON COLUMN dataset.FactorUnitarioBacheoSuperficial IS 'FUBS';
COMMENT ON COLUMN dataset.PrecioUnitarioBacheoPromedio IS 'PUBPr';
COMMENT ON COLUMN dataset.FactorUnitarioBacheoPromedio IS 'FUBPr';
COMMENT ON COLUMN dataset.RenivBrocPozo IS 'Renivelacion de brocal de pozo de visita de lofo de 60 cm de diámetros y peso de 165 kg';
COMMENT ON COLUMN dataset.SumInstalRejilla IS 'Suministro e instalación de rejilla de piso con marco y bisagra de fierro fundido de 40 por 60 cm';
COMMENT ON COLUMN dataset.RenivColadera IS 'Renivelación de coladera';
COMMENT ON COLUMN dataset.LevantPoligonal IS 'Levantamiento de poligonales';
COMMENT ON COLUMN dataset.DemolManual IS 'Demolición por medios manuales de guarniciones y banquetas de concreto simple';
COMMENT ON COLUMN dataset.CargaM3 IS '(CargaM3) Carga mecánica, acarreo en camión al primer kilometro y descarga, de material de demolición de concreto hidráulico, volumen medido colocado';
COMMENT ON COLUMN dataset.AcarreoM3 IS 'Acarreo en camión, de material de demolición de concreto, kilómetros subsecuentes, zona urbana';
COMMENT ON COLUMN dataset.PinturaDelimitacion IS 'Pintura de raya sencilla';
COMMENT ON COLUMN dataset.Conf_Chapu IS 'Confinamiento_TipoChapultepec';
COMMENT ON COLUMN dataset.Conf_Reforma IS 'Confinamiento_TipoReforma';
COMMENT ON COLUMN dataset.SenalVertPreventiva IS 'Suministro y colocación de señal preventiva';
COMMENT ON COLUMN dataset.SenalVertRestrictiva IS 'Suministro y colocación de señal restrictiva';
COMMENT ON COLUMN dataset.SenalHorizSOLO IS 'Plantilla de SOLO de 0.80 x 1.20m con pictograma con pintura blanca termoplástica  y reflejante';
COMMENT ON COLUMN dataset.SenalHorizPintVerde IS 'Suministro y aplicacion de pintura base agua en raya verde';
COMMENT ON COLUMN dataset.SenalHorizComplement IS 'Pintado de raya de 0.20 m de ancho para indicar cruce de peatones';
COMMENT ON COLUMN dataset.Bolardo IS 'Suministro y colocación de bolardo de 15 cm de diámetro y 100 cm de altura';
COMMENT ON COLUMN dataset.Biciestacionamientos IS 'Estacionamiento para bicicleta tipo "U" invertida';

insert into dataset values (1,1,40559.40,0.21,256.19,9.19,39.63,884.33,0.275,1698.67,0.075,1291.50,0.175,2513.37,5201.67,258.92,0.480256,323.92,33.84,8.79,9.74,2785.50,5220.00,2905.91,2905.91,755.83,256.63,022.11,728.90,50.00,1000.00,479.33);

-- Name: cities;
CREATE TABLE cities (
    id_city serial,
    name varchar(255),
    short_name varchar(255),
    status boolean DEFAULT true
);

insert into cities values (1,'Distrito Federal', 'DF');
