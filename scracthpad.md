# project_triathlon

main

<<NO JEST TEST>>
triathlon_simplified_1.0
----functional MVC + html

triathlon_simplified_1.1
This athlete has 3 logged trainings:
    10/02/2024     06:15     65.30 minutes     Everdeen Hall     
    12/01/2024     08:45     45.00 minutes     Green Hills     
    24/02/2023     15:32     32.12 minutes     Maxwells's Hall   

----Training & Athlete
----plan to separate sports component
----functional MVC, only showed training & athlete

triathlon_simplified_1.2
This athlete has 6 logged trainings:
     [false] Fri Feb 02 2024 00:00:00 GMT+1300 (New Zealand Daylight Time) - 0.00 minutes [Everdeen Hall]     
     [false] Fri Feb 23 2024 00:00:00 GMT+1300 (New Zealand Daylight Time) - 0.00 minutes [Green Hills]     
     [false] Fri Jan 05 2024 00:00:00 GMT+1300 (New Zealand Daylight Time) - 0.00 minutes [Everdeen Hall]     
     [true] Mon Jan 22 2024 00:00:00 GMT+1300 (New Zealand Daylight Time) - 216.00 minutes [Heavensbee Gymnasium]     
     [true] Sun Dec 31 2023 00:00:00 GMT+1300 (New Zealand Daylight Time) - 140.00 minutes [Larcroft]     
     [false] Tue Dec 10 2024 00:00:00 GMT+1300 (New Zealand Daylight Time) - 0.00 minutes [Maxwell's Hall]     
----functional MVC + html
----true or false test + duration


<<JEST TEST>>

[curent]
triathlon_indexDb
----failures
----storage?

[MOST STABLE]
triathlon_no_db
----100% TEST
----failed local Storage

[STORAGE]
triathlon_non_oop
----storage & storage.test module
----has to replace the triathlon_no_db to check storage functionality

triathlon_1.0
----functional loading storage
----issues:test

triathlon_1.1
----compare main: no formatDate() & formatTime()
----same drill, storage, & training test
----issues:test

triathlon_1.2
----athlete test & class only, functionality unverfied
----training test & class, functional
----training LOCALSTORAGE test pass
