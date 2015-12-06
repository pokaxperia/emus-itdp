-- Name: modalidades;
CREATE TABLE modalidades (
    id_modalidad serial,
    nombre varchar(255) not null,
    descripcion varchar(255),
    clase varchar(50),
    created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now(),
    status boolean DEFAULT true
);

insert into modalidades (nombre, clase) values ('Calles', 'ghost1');
insert into modalidades (nombre, clase) values ('Sistemas Integrados de Transporte', 'ghost2');
insert into modalidades (nombre, clase) values ('Desarrollo Orientado al TransporteE', 'ghost3');
insert into modalidades (nombre, clase) values ('Gestión de la demanda', 'ghost4');
insert into modalidades (nombre, clase) values ('Carga urbana', 'ghost5');


-- Name: proyectos;
CREATE TABLE proyectos (
    id_proyecto serial,
    id_modalidad integer,
    nombre varchar(255),
    descripcion varchar(255),
    imagen_url varchar(255),
    estatus varchar(50) not null default 'Inactivo',
    calculadora varchar (50) not null default 'Inactivo',
    created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now(),
    status boolean DEFAULT true
);

-- Name: users;
CREATE TABLE users (
    id_user serial,
    username character varying(255),
    email character varying(255),
    name character varying(255),
    lastname character varying(255),
    pwd varchar(255) NOT NULL,
    type varchar(45) NULL DEFAULT 'admin',
    date_created timestamp without time zone,
    status boolean DEFAULT true
);
insert into users (username, email, name, lastname, pwd) values ('caarloshugo', 'carlos@appdata.mx', 'Carlos Hugo', 'Gonzalez', md5('caarloshugo'));


