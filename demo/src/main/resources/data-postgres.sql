insert into users (id,name,last_name,password,date_of_birth,email,telephone,country,city,profession,company_info,enabled)
    values (1,'vladimir','blanusa','123','1-1-1010','vb@gm','381','srbija','krag','jebac','najjaca firmetino bajo','true');
insert into users (date_of_birth, id, city,company_info,country,email,last_name,name,password,profession,telephone, enabled)
    values ('2001-07-28', 2, 'Novi Sad','Stagod','Serbia','nemanjaranit@gmail.com','Ranitović','Nemanja','hh123','programator','0643388159', 'true');
insert into users (date_of_birth, id, city,company_info,country,email,last_name,name,password,profession,telephone, enabled)
    values ('2002-01-18', 3, 'Novi Sad','Stagod2','Serbia','nemanjatodorovic132002002@gmail.com','Todorovic','Nemanja','hh123','programer','0644316167', 'true');

insert into system_administrators(sys_admin_id, user_id) values (1, 2);
insert into company_administrator(comp_admin_id, company_id, user_id) values (0, 2, 2);

insert into company (avg_rate, id, city, country, name)
    values (0.0, 1, 'Sremska Mitrovica', 'Serbia', 'Andrea'),
           (2.0,2,'Kragujevac','Serbia','Kompa1'),
           (3.0,3,'Sombor','Serbia','Kompa2'),
           (4.0,4,'Gradograd','Mongolija','Kompa3');
