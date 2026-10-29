delete from public.payments
where user_id in (select id from auth.users where email = 'verify@embeddlytraining.co');

delete from public.enrollments
where user_id in (select id from auth.users where email = 'verify@embeddlytraining.co');

delete from auth.users
where email = 'verify@embeddlytraining.co';