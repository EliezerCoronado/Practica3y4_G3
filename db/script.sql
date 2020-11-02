CREATE TABLE CARD(
	id         INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	name       VARCHAR(100)  NOT NULL,
	image      VARCHAR(100)  NOT NULL,
	chargeRate DECIMAL(15,2) NOT NULL,
	active     BIT NOT NULL
);

CREATE TABLE DISPONIBLE(
	id         INT NOT NULL AUTO_INCREMENT, 
	cantidad   DECIMAL(15,2) NOT NULL,
	fk_card    INT NOT NULL,
	PRIMARY KEY (id,fk_card)
);


CREATE TABLE USUARIO (
  id_usuario       int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  dpi              varchar(45) NOT NULL UNIQUE,
  Nombres          varchar(45) NOT NULL,
  Apellidos        varchar(45) NOT NULL,
  correo           varchar(45) NOT NULL UNIQUE,
  username         varchar(45) NOT NULL UNIQUE,
  fecha_nacimiento date NOT NULL,
  password         varchar(200) NOT NULL
);

CREATE TABLE FACTURA(
	id          INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	fk_usuario  INT NOT NULL,
	fecha       DATETIME NOT NULL,
	tipo_cambio DECIMAL(15,2) NOT NULL,
	FOREIGN KEY (fk_usuario) REFERENCES USUARIO(id_usuario)
);

CREATE TABLE DETALLE_FACTURA(
 fk_factura INT NOT NULL,
 fk_card    INT NOT NULL,
 cantidad   DECIMAL(15,2) NOT NULL,
 PRIMARY KEY (fk_factura,fk_card)
);



