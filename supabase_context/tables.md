| table_schema | table_name                 |
| ------------ | -------------------------- |
| auth         | audit_log_entries          |
| auth         | flow_state                 |
| auth         | identities                 |
| auth         | instances                  |
| auth         | mfa_amr_claims             |
| auth         | mfa_challenges             |
| auth         | mfa_factors                |
| auth         | oauth_clients              |
| auth         | one_time_tokens            |
| auth         | refresh_tokens             |
| auth         | saml_providers             |
| auth         | saml_relay_states          |
| auth         | schema_migrations          |
| auth         | sessions                   |
| auth         | sso_domains                |
| auth         | sso_providers              |
| auth         | users                      |
| public       | blog_likes                 |
| public       | blog_posts                 |
| public       | blogs                      |
| public       | contact_messages           |
| public       | profiles                   |
| public       | projects                   |
| public       | social_links               |
| realtime     | messages                   |
| realtime     | schema_migrations          |
| realtime     | subscription               |
| storage      | buckets                    |
| storage      | migrations                 |
| storage      | objects                    |
| storage      | s3_multipart_uploads       |
| storage      | s3_multipart_uploads_parts |
| vault        | secrets                    |

| table_schema | table_name                 | column_name                 | data_type                   | is_nullable | column_default                                  |
| ------------ | -------------------------- | --------------------------- | --------------------------- | ----------- | ----------------------------------------------- |
| auth         | audit_log_entries          | instance_id                 | uuid                        | YES         | null                                            |
| auth         | audit_log_entries          | id                          | uuid                        | NO          | null                                            |
| auth         | audit_log_entries          | payload                     | json                        | YES         | null                                            |
| auth         | audit_log_entries          | created_at                  | timestamp with time zone    | YES         | null                                            |
| auth         | audit_log_entries          | ip_address                  | character varying           | NO          | ''::character varying                           |
| auth         | flow_state                 | id                          | uuid                        | NO          | null                                            |
| auth         | flow_state                 | user_id                     | uuid                        | YES         | null                                            |
| auth         | flow_state                 | auth_code                   | text                        | NO          | null                                            |
| auth         | flow_state                 | code_challenge_method       | USER-DEFINED                | NO          | null                                            |
| auth         | flow_state                 | code_challenge              | text                        | NO          | null                                            |
| auth         | flow_state                 | provider_type               | text                        | NO          | null                                            |
| auth         | flow_state                 | provider_access_token       | text                        | YES         | null                                            |
| auth         | flow_state                 | provider_refresh_token      | text                        | YES         | null                                            |
| auth         | flow_state                 | created_at                  | timestamp with time zone    | YES         | null                                            |
| auth         | flow_state                 | updated_at                  | timestamp with time zone    | YES         | null                                            |
| auth         | flow_state                 | authentication_method       | text                        | NO          | null                                            |
| auth         | flow_state                 | auth_code_issued_at         | timestamp with time zone    | YES         | null                                            |
| auth         | identities                 | provider_id                 | text                        | NO          | null                                            |
| auth         | identities                 | user_id                     | uuid                        | NO          | null                                            |
| auth         | identities                 | identity_data               | jsonb                       | NO          | null                                            |
| auth         | identities                 | provider                    | text                        | NO          | null                                            |
| auth         | identities                 | last_sign_in_at             | timestamp with time zone    | YES         | null                                            |
| auth         | identities                 | created_at                  | timestamp with time zone    | YES         | null                                            |
| auth         | identities                 | updated_at                  | timestamp with time zone    | YES         | null                                            |
| auth         | identities                 | email                       | text                        | YES         | null                                            |
| auth         | identities                 | id                          | uuid                        | NO          | gen_random_uuid()                               |
| auth         | instances                  | id                          | uuid                        | NO          | null                                            |
| auth         | instances                  | uuid                        | uuid                        | YES         | null                                            |
| auth         | instances                  | raw_base_config             | text                        | YES         | null                                            |
| auth         | instances                  | created_at                  | timestamp with time zone    | YES         | null                                            |
| auth         | instances                  | updated_at                  | timestamp with time zone    | YES         | null                                            |
| auth         | mfa_amr_claims             | session_id                  | uuid                        | NO          | null                                            |
| auth         | mfa_amr_claims             | created_at                  | timestamp with time zone    | NO          | null                                            |
| auth         | mfa_amr_claims             | updated_at                  | timestamp with time zone    | NO          | null                                            |
| auth         | mfa_amr_claims             | authentication_method       | text                        | NO          | null                                            |
| auth         | mfa_amr_claims             | id                          | uuid                        | NO          | null                                            |
| auth         | mfa_challenges             | id                          | uuid                        | NO          | null                                            |
| auth         | mfa_challenges             | factor_id                   | uuid                        | NO          | null                                            |
| auth         | mfa_challenges             | created_at                  | timestamp with time zone    | NO          | null                                            |
| auth         | mfa_challenges             | verified_at                 | timestamp with time zone    | YES         | null                                            |
| auth         | mfa_challenges             | ip_address                  | inet                        | NO          | null                                            |
| auth         | mfa_challenges             | otp_code                    | text                        | YES         | null                                            |
| auth         | mfa_challenges             | web_authn_session_data      | jsonb                       | YES         | null                                            |
| auth         | mfa_factors                | id                          | uuid                        | NO          | null                                            |
| auth         | mfa_factors                | user_id                     | uuid                        | NO          | null                                            |
| auth         | mfa_factors                | friendly_name               | text                        | YES         | null                                            |
| auth         | mfa_factors                | factor_type                 | USER-DEFINED                | NO          | null                                            |
| auth         | mfa_factors                | status                      | USER-DEFINED                | NO          | null                                            |
| auth         | mfa_factors                | created_at                  | timestamp with time zone    | NO          | null                                            |
| auth         | mfa_factors                | updated_at                  | timestamp with time zone    | NO          | null                                            |
| auth         | mfa_factors                | secret                      | text                        | YES         | null                                            |
| auth         | mfa_factors                | phone                       | text                        | YES         | null                                            |
| auth         | mfa_factors                | last_challenged_at          | timestamp with time zone    | YES         | null                                            |
| auth         | mfa_factors                | web_authn_credential        | jsonb                       | YES         | null                                            |
| auth         | mfa_factors                | web_authn_aaguid            | uuid                        | YES         | null                                            |
| auth         | oauth_clients              | id                          | uuid                        | NO          | null                                            |
| auth         | oauth_clients              | client_id                   | text                        | NO          | null                                            |
| auth         | oauth_clients              | client_secret_hash          | text                        | NO          | null                                            |
| auth         | oauth_clients              | registration_type           | USER-DEFINED                | NO          | null                                            |
| auth         | oauth_clients              | redirect_uris               | text                        | NO          | null                                            |
| auth         | oauth_clients              | grant_types                 | text                        | NO          | null                                            |
| auth         | oauth_clients              | client_name                 | text                        | YES         | null                                            |
| auth         | oauth_clients              | client_uri                  | text                        | YES         | null                                            |
| auth         | oauth_clients              | logo_uri                    | text                        | YES         | null                                            |
| auth         | oauth_clients              | created_at                  | timestamp with time zone    | NO          | now()                                           |
| auth         | oauth_clients              | updated_at                  | timestamp with time zone    | NO          | now()                                           |
| auth         | oauth_clients              | deleted_at                  | timestamp with time zone    | YES         | null                                            |
| auth         | one_time_tokens            | id                          | uuid                        | NO          | null                                            |
| auth         | one_time_tokens            | user_id                     | uuid                        | NO          | null                                            |
| auth         | one_time_tokens            | token_type                  | USER-DEFINED                | NO          | null                                            |
| auth         | one_time_tokens            | token_hash                  | text                        | NO          | null                                            |
| auth         | one_time_tokens            | relates_to                  | text                        | NO          | null                                            |
| auth         | one_time_tokens            | created_at                  | timestamp without time zone | NO          | now()                                           |
| auth         | one_time_tokens            | updated_at                  | timestamp without time zone | NO          | now()                                           |
| auth         | refresh_tokens             | instance_id                 | uuid                        | YES         | null                                            |
| auth         | refresh_tokens             | id                          | bigint                      | NO          | nextval('auth.refresh_tokens_id_seq'::regclass) |
| auth         | refresh_tokens             | token                       | character varying           | YES         | null                                            |
| auth         | refresh_tokens             | user_id                     | character varying           | YES         | null                                            |
| auth         | refresh_tokens             | revoked                     | boolean                     | YES         | null                                            |
| auth         | refresh_tokens             | created_at                  | timestamp with time zone    | YES         | null                                            |
| auth         | refresh_tokens             | updated_at                  | timestamp with time zone    | YES         | null                                            |
| auth         | refresh_tokens             | parent                      | character varying           | YES         | null                                            |
| auth         | refresh_tokens             | session_id                  | uuid                        | YES         | null                                            |
| auth         | saml_providers             | id                          | uuid                        | NO          | null                                            |
| auth         | saml_providers             | sso_provider_id             | uuid                        | NO          | null                                            |
| auth         | saml_providers             | entity_id                   | text                        | NO          | null                                            |
| auth         | saml_providers             | metadata_xml                | text                        | NO          | null                                            |
| auth         | saml_providers             | metadata_url                | text                        | YES         | null                                            |
| auth         | saml_providers             | attribute_mapping           | jsonb                       | YES         | null                                            |
| auth         | saml_providers             | created_at                  | timestamp with time zone    | YES         | null                                            |
| auth         | saml_providers             | updated_at                  | timestamp with time zone    | YES         | null                                            |
| auth         | saml_providers             | name_id_format              | text                        | YES         | null                                            |
| auth         | saml_relay_states          | id                          | uuid                        | NO          | null                                            |
| auth         | saml_relay_states          | sso_provider_id             | uuid                        | NO          | null                                            |
| auth         | saml_relay_states          | request_id                  | text                        | NO          | null                                            |
| auth         | saml_relay_states          | for_email                   | text                        | YES         | null                                            |
| auth         | saml_relay_states          | redirect_to                 | text                        | YES         | null                                            |
| auth         | saml_relay_states          | created_at                  | timestamp with time zone    | YES         | null                                            |
| auth         | saml_relay_states          | updated_at                  | timestamp with time zone    | YES         | null                                            |
| auth         | saml_relay_states          | flow_state_id               | uuid                        | YES         | null                                            |
| auth         | schema_migrations          | version                     | character varying           | NO          | null                                            |
| auth         | sessions                   | id                          | uuid                        | NO          | null                                            |
| auth         | sessions                   | user_id                     | uuid                        | NO          | null                                            |
| auth         | sessions                   | created_at                  | timestamp with time zone    | YES         | null                                            |
| auth         | sessions                   | updated_at                  | timestamp with time zone    | YES         | null                                            |
| auth         | sessions                   | factor_id                   | uuid                        | YES         | null                                            |
| auth         | sessions                   | aal                         | USER-DEFINED                | YES         | null                                            |
| auth         | sessions                   | not_after                   | timestamp with time zone    | YES         | null                                            |
| auth         | sessions                   | refreshed_at                | timestamp without time zone | YES         | null                                            |
| auth         | sessions                   | user_agent                  | text                        | YES         | null                                            |
| auth         | sessions                   | ip                          | inet                        | YES         | null                                            |
| auth         | sessions                   | tag                         | text                        | YES         | null                                            |
| auth         | sso_domains                | id                          | uuid                        | NO          | null                                            |
| auth         | sso_domains                | sso_provider_id             | uuid                        | NO          | null                                            |
| auth         | sso_domains                | domain                      | text                        | NO          | null                                            |
| auth         | sso_domains                | created_at                  | timestamp with time zone    | YES         | null                                            |
| auth         | sso_domains                | updated_at                  | timestamp with time zone    | YES         | null                                            |
| auth         | sso_providers              | id                          | uuid                        | NO          | null                                            |
| auth         | sso_providers              | resource_id                 | text                        | YES         | null                                            |
| auth         | sso_providers              | created_at                  | timestamp with time zone    | YES         | null                                            |
| auth         | sso_providers              | updated_at                  | timestamp with time zone    | YES         | null                                            |
| auth         | sso_providers              | disabled                    | boolean                     | YES         | null                                            |
| auth         | users                      | instance_id                 | uuid                        | YES         | null                                            |
| auth         | users                      | id                          | uuid                        | NO          | null                                            |
| auth         | users                      | aud                         | character varying           | YES         | null                                            |
| auth         | users                      | role                        | character varying           | YES         | null                                            |
| auth         | users                      | email                       | character varying           | YES         | null                                            |
| auth         | users                      | encrypted_password          | character varying           | YES         | null                                            |
| auth         | users                      | email_confirmed_at          | timestamp with time zone    | YES         | null                                            |
| auth         | users                      | invited_at                  | timestamp with time zone    | YES         | null                                            |
| auth         | users                      | confirmation_token          | character varying           | YES         | null                                            |
| auth         | users                      | confirmation_sent_at        | timestamp with time zone    | YES         | null                                            |
| auth         | users                      | recovery_token              | character varying           | YES         | null                                            |
| auth         | users                      | recovery_sent_at            | timestamp with time zone    | YES         | null                                            |
| auth         | users                      | email_change_token_new      | character varying           | YES         | null                                            |
| auth         | users                      | email_change                | character varying           | YES         | null                                            |
| auth         | users                      | email_change_sent_at        | timestamp with time zone    | YES         | null                                            |
| auth         | users                      | last_sign_in_at             | timestamp with time zone    | YES         | null                                            |
| auth         | users                      | raw_app_meta_data           | jsonb                       | YES         | null                                            |
| auth         | users                      | raw_user_meta_data          | jsonb                       | YES         | null                                            |
| auth         | users                      | is_super_admin              | boolean                     | YES         | null                                            |
| auth         | users                      | created_at                  | timestamp with time zone    | YES         | null                                            |
| auth         | users                      | updated_at                  | timestamp with time zone    | YES         | null                                            |
| auth         | users                      | phone                       | text                        | YES         | NULL::character varying                         |
| auth         | users                      | phone_confirmed_at          | timestamp with time zone    | YES         | null                                            |
| auth         | users                      | phone_change                | text                        | YES         | ''::character varying                           |
| auth         | users                      | phone_change_token          | character varying           | YES         | ''::character varying                           |
| auth         | users                      | phone_change_sent_at        | timestamp with time zone    | YES         | null                                            |
| auth         | users                      | confirmed_at                | timestamp with time zone    | YES         | null                                            |
| auth         | users                      | email_change_token_current  | character varying           | YES         | ''::character varying                           |
| auth         | users                      | email_change_confirm_status | smallint                    | YES         | 0                                               |
| auth         | users                      | banned_until                | timestamp with time zone    | YES         | null                                            |
| auth         | users                      | reauthentication_token      | character varying           | YES         | ''::character varying                           |
| auth         | users                      | reauthentication_sent_at    | timestamp with time zone    | YES         | null                                            |
| auth         | users                      | is_sso_user                 | boolean                     | NO          | false                                           |
| auth         | users                      | deleted_at                  | timestamp with time zone    | YES         | null                                            |
| auth         | users                      | is_anonymous                | boolean                     | NO          | false                                           |
| extensions   | pg_stat_statements         | userid                      | oid                         | YES         | null                                            |
| extensions   | pg_stat_statements         | dbid                        | oid                         | YES         | null                                            |
| extensions   | pg_stat_statements         | toplevel                    | boolean                     | YES         | null                                            |
| extensions   | pg_stat_statements         | queryid                     | bigint                      | YES         | null                                            |
| extensions   | pg_stat_statements         | query                       | text                        | YES         | null                                            |
| extensions   | pg_stat_statements         | plans                       | bigint                      | YES         | null                                            |
| extensions   | pg_stat_statements         | total_plan_time             | double precision            | YES         | null                                            |
| extensions   | pg_stat_statements         | min_plan_time               | double precision            | YES         | null                                            |
| extensions   | pg_stat_statements         | max_plan_time               | double precision            | YES         | null                                            |
| extensions   | pg_stat_statements         | mean_plan_time              | double precision            | YES         | null                                            |
| extensions   | pg_stat_statements         | stddev_plan_time            | double precision            | YES         | null                                            |
| extensions   | pg_stat_statements         | calls                       | bigint                      | YES         | null                                            |
| extensions   | pg_stat_statements         | total_exec_time             | double precision            | YES         | null                                            |
| extensions   | pg_stat_statements         | min_exec_time               | double precision            | YES         | null                                            |
| extensions   | pg_stat_statements         | max_exec_time               | double precision            | YES         | null                                            |
| extensions   | pg_stat_statements         | mean_exec_time              | double precision            | YES         | null                                            |
| extensions   | pg_stat_statements         | stddev_exec_time            | double precision            | YES         | null                                            |
| extensions   | pg_stat_statements         | rows                        | bigint                      | YES         | null                                            |
| extensions   | pg_stat_statements         | shared_blks_hit             | bigint                      | YES         | null                                            |
| extensions   | pg_stat_statements         | shared_blks_read            | bigint                      | YES         | null                                            |
| extensions   | pg_stat_statements         | shared_blks_dirtied         | bigint                      | YES         | null                                            |
| extensions   | pg_stat_statements         | shared_blks_written         | bigint                      | YES         | null                                            |
| extensions   | pg_stat_statements         | local_blks_hit              | bigint                      | YES         | null                                            |
| extensions   | pg_stat_statements         | local_blks_read             | bigint                      | YES         | null                                            |
| extensions   | pg_stat_statements         | local_blks_dirtied          | bigint                      | YES         | null                                            |
| extensions   | pg_stat_statements         | local_blks_written          | bigint                      | YES         | null                                            |
| extensions   | pg_stat_statements         | temp_blks_read              | bigint                      | YES         | null                                            |
| extensions   | pg_stat_statements         | temp_blks_written           | bigint                      | YES         | null                                            |
| extensions   | pg_stat_statements         | shared_blk_read_time        | double precision            | YES         | null                                            |
| extensions   | pg_stat_statements         | shared_blk_write_time       | double precision            | YES         | null                                            |
| extensions   | pg_stat_statements         | local_blk_read_time         | double precision            | YES         | null                                            |
| extensions   | pg_stat_statements         | local_blk_write_time        | double precision            | YES         | null                                            |
| extensions   | pg_stat_statements         | temp_blk_read_time          | double precision            | YES         | null                                            |
| extensions   | pg_stat_statements         | temp_blk_write_time         | double precision            | YES         | null                                            |
| extensions   | pg_stat_statements         | wal_records                 | bigint                      | YES         | null                                            |
| extensions   | pg_stat_statements         | wal_fpi                     | bigint                      | YES         | null                                            |
| extensions   | pg_stat_statements         | wal_bytes                   | numeric                     | YES         | null                                            |
| extensions   | pg_stat_statements         | jit_functions               | bigint                      | YES         | null                                            |
| extensions   | pg_stat_statements         | jit_generation_time         | double precision            | YES         | null                                            |
| extensions   | pg_stat_statements         | jit_inlining_count          | bigint                      | YES         | null                                            |
| extensions   | pg_stat_statements         | jit_inlining_time           | double precision            | YES         | null                                            |
| extensions   | pg_stat_statements         | jit_optimization_count      | bigint                      | YES         | null                                            |
| extensions   | pg_stat_statements         | jit_optimization_time       | double precision            | YES         | null                                            |
| extensions   | pg_stat_statements         | jit_emission_count          | bigint                      | YES         | null                                            |
| extensions   | pg_stat_statements         | jit_emission_time           | double precision            | YES         | null                                            |
| extensions   | pg_stat_statements         | jit_deform_count            | bigint                      | YES         | null                                            |
| extensions   | pg_stat_statements         | jit_deform_time             | double precision            | YES         | null                                            |
| extensions   | pg_stat_statements         | stats_since                 | timestamp with time zone    | YES         | null                                            |
| extensions   | pg_stat_statements         | minmax_stats_since          | timestamp with time zone    | YES         | null                                            |
| extensions   | pg_stat_statements_info    | dealloc                     | bigint                      | YES         | null                                            |
| extensions   | pg_stat_statements_info    | stats_reset                 | timestamp with time zone    | YES         | null                                            |
| public       | blog_likes                 | blog_id                     | uuid                        | NO          | null                                            |
| public       | blog_likes                 | device_id                   | text                        | NO          | null                                            |
| public       | blog_likes                 | created_at                  | timestamp with time zone    | NO          | now()                                           |
| public       | blog_posts                 | id                          | uuid                        | NO          | gen_random_uuid()                               |
| public       | blog_posts                 | title                       | text                        | NO          | null                                            |
| public       | blog_posts                 | slug                        | text                        | NO          | null                                            |
| public       | blog_posts                 | excerpt                     | text                        | YES         | null                                            |
| public       | blog_posts                 | content                     | text                        | NO          | null                                            |
| public       | blog_posts                 | image_url                   | text                        | YES         | null                                            |
| public       | blog_posts                 | published                   | boolean                     | YES         | false                                           |
| public       | blog_posts                 | featured                    | boolean                     | YES         | false                                           |
| public       | blog_posts                 | tags                        | ARRAY                       | YES         | null                                            |
| public       | blog_posts                 | reading_time                | integer                     | YES         | null                                            |
| public       | blog_posts                 | created_at                  | timestamp with time zone    | YES         | now()                                           |
| public       | blog_posts                 | updated_at                  | timestamp with time zone    | YES         | now()                                           |
| public       | blog_posts                 | published_at                | timestamp with time zone    | YES         | null                                            |
| public       | blog_posts                 | user_id                     | uuid                        | YES         | null                                            |
| public       | blogs                      | id                          | uuid                        | NO          | gen_random_uuid()                               |
| public       | blogs                      | title                       | text                        | NO          | null                                            |
| public       | blogs                      | content                     | text                        | NO          | null                                            |
| public       | blogs                      | thumbnail                   | text                        | YES         | null                                            |
| public       | blogs                      | video_url                   | text                        | YES         | null                                            |
| public       | blogs                      | created_at                  | timestamp with time zone    | NO          | now()                                           |
| public       | blogs                      | views                       | integer                     | NO          | 0                                               |
| public       | blogs                      | tags                        | ARRAY                       | NO          | '{}'::text[]                                    |
| public       | blogs                      | type                        | text                        | YES         | null                                            |
| public       | contact_messages           | id                          | uuid                        | NO          | gen_random_uuid()                               |
| public       | contact_messages           | name                        | text                        | NO          | null                                            |
| public       | contact_messages           | email                       | text                        | NO          | null                                            |
| public       | contact_messages           | subject                     | text                        | YES         | null                                            |
| public       | contact_messages           | message                     | text                        | NO          | null                                            |
| public       | contact_messages           | read                        | boolean                     | YES         | false                                           |
| public       | contact_messages           | created_at                  | timestamp with time zone    | YES         | now()                                           |
| public       | profiles                   | id                          | uuid                        | NO          | null                                            |
| public       | profiles                   | email                       | text                        | NO          | null                                            |
| public       | profiles                   | full_name                   | text                        | YES         | null                                            |
| public       | profiles                   | avatar_url                  | text                        | YES         | null                                            |
| public       | profiles                   | created_at                  | timestamp with time zone    | YES         | now()                                           |
| public       | profiles                   | updated_at                  | timestamp with time zone    | YES         | now()                                           |
| public       | projects                   | id                          | uuid                        | NO          | gen_random_uuid()                               |
| public       | projects                   | title                       | text                        | NO          | null                                            |
| public       | projects                   | description                 | text                        | YES         | null                                            |
| public       | projects                   | long_description            | text                        | YES         | null                                            |
| public       | projects                   | image_url                   | text                        | YES         | null                                            |
| public       | projects                   | demo_url                    | text                        | YES         | null                                            |
| public       | projects                   | github_url                  | text                        | YES         | null                                            |
| public       | projects                   | technologies                | ARRAY                       | YES         | null                                            |
| public       | projects                   | featured                    | boolean                     | YES         | false                                           |
| public       | projects                   | status                      | text                        | YES         | 'completed'::text                               |
| public       | projects                   | created_at                  | timestamp with time zone    | YES         | now()                                           |
| public       | projects                   | updated_at                  | timestamp with time zone    | YES         | now()                                           |
| public       | projects                   | user_id                     | uuid                        | YES         | null                                            |
| public       | social_links               | id                          | uuid                        | NO          | gen_random_uuid()                               |
| public       | social_links               | platform                    | text                        | NO          | null                                            |
| public       | social_links               | url                         | text                        | NO          | null                                            |
| public       | social_links               | display_name                | text                        | YES         | null                                            |
| public       | social_links               | icon_name                   | text                        | YES         | null                                            |
| public       | social_links               | order_index                 | integer                     | YES         | 0                                               |
| public       | social_links               | visible                     | boolean                     | YES         | true                                            |
| public       | social_links               | created_at                  | timestamp with time zone    | YES         | now()                                           |
| public       | social_links               | updated_at                  | timestamp with time zone    | YES         | now()                                           |
| public       | social_links               | user_id                     | uuid                        | YES         | null                                            |
| realtime     | messages                   | topic                       | text                        | NO          | null                                            |
| realtime     | messages                   | extension                   | text                        | NO          | null                                            |
| realtime     | messages                   | payload                     | jsonb                       | YES         | null                                            |
| realtime     | messages                   | event                       | text                        | YES         | null                                            |
| realtime     | messages                   | private                     | boolean                     | YES         | false                                           |
| realtime     | messages                   | updated_at                  | timestamp without time zone | NO          | now()                                           |
| realtime     | messages                   | inserted_at                 | timestamp without time zone | NO          | now()                                           |
| realtime     | messages                   | id                          | uuid                        | NO          | gen_random_uuid()                               |
| realtime     | schema_migrations          | version                     | bigint                      | NO          | null                                            |
| realtime     | schema_migrations          | inserted_at                 | timestamp without time zone | YES         | null                                            |
| realtime     | subscription               | id                          | bigint                      | NO          | null                                            |
| realtime     | subscription               | subscription_id             | uuid                        | NO          | null                                            |
| realtime     | subscription               | entity                      | regclass                    | NO          | null                                            |
| realtime     | subscription               | filters                     | ARRAY                       | NO          | '{}'::realtime.user_defined_filter[]            |
| realtime     | subscription               | claims                      | jsonb                       | NO          | null                                            |
| realtime     | subscription               | claims_role                 | regrole                     | NO          | null                                            |
| realtime     | subscription               | created_at                  | timestamp without time zone | NO          | timezone('utc'::text, now())                    |
| storage      | buckets                    | id                          | text                        | NO          | null                                            |
| storage      | buckets                    | name                        | text                        | NO          | null                                            |
| storage      | buckets                    | owner                       | uuid                        | YES         | null                                            |
| storage      | buckets                    | created_at                  | timestamp with time zone    | YES         | now()                                           |
| storage      | buckets                    | updated_at                  | timestamp with time zone    | YES         | now()                                           |
| storage      | buckets                    | public                      | boolean                     | YES         | false                                           |
| storage      | buckets                    | avif_autodetection          | boolean                     | YES         | false                                           |
| storage      | buckets                    | file_size_limit             | bigint                      | YES         | null                                            |
| storage      | buckets                    | allowed_mime_types          | ARRAY                       | YES         | null                                            |
| storage      | buckets                    | owner_id                    | text                        | YES         | null                                            |
| storage      | migrations                 | id                          | integer                     | NO          | null                                            |
| storage      | migrations                 | name                        | character varying           | NO          | null                                            |
| storage      | migrations                 | hash                        | character varying           | NO          | null                                            |
| storage      | migrations                 | executed_at                 | timestamp without time zone | YES         | CURRENT_TIMESTAMP                               |
| storage      | objects                    | id                          | uuid                        | NO          | gen_random_uuid()                               |
| storage      | objects                    | bucket_id                   | text                        | YES         | null                                            |
| storage      | objects                    | name                        | text                        | YES         | null                                            |
| storage      | objects                    | owner                       | uuid                        | YES         | null                                            |
| storage      | objects                    | created_at                  | timestamp with time zone    | YES         | now()                                           |
| storage      | objects                    | updated_at                  | timestamp with time zone    | YES         | now()                                           |
| storage      | objects                    | last_accessed_at            | timestamp with time zone    | YES         | now()                                           |
| storage      | objects                    | metadata                    | jsonb                       | YES         | null                                            |
| storage      | objects                    | path_tokens                 | ARRAY                       | YES         | null                                            |
| storage      | objects                    | version                     | text                        | YES         | null                                            |
| storage      | objects                    | owner_id                    | text                        | YES         | null                                            |
| storage      | objects                    | user_metadata               | jsonb                       | YES         | null                                            |
| storage      | s3_multipart_uploads       | id                          | text                        | NO          | null                                            |
| storage      | s3_multipart_uploads       | in_progress_size            | bigint                      | NO          | 0                                               |
| storage      | s3_multipart_uploads       | upload_signature            | text                        | NO          | null                                            |
| storage      | s3_multipart_uploads       | bucket_id                   | text                        | NO          | null                                            |
| storage      | s3_multipart_uploads       | key                         | text                        | NO          | null                                            |
| storage      | s3_multipart_uploads       | version                     | text                        | NO          | null                                            |
| storage      | s3_multipart_uploads       | owner_id                    | text                        | YES         | null                                            |
| storage      | s3_multipart_uploads       | created_at                  | timestamp with time zone    | NO          | now()                                           |
| storage      | s3_multipart_uploads       | user_metadata               | jsonb                       | YES         | null                                            |
| storage      | s3_multipart_uploads_parts | id                          | uuid                        | NO          | gen_random_uuid()                               |
| storage      | s3_multipart_uploads_parts | upload_id                   | text                        | NO          | null                                            |
| storage      | s3_multipart_uploads_parts | size                        | bigint                      | NO          | 0                                               |
| storage      | s3_multipart_uploads_parts | part_number                 | integer                     | NO          | null                                            |
| storage      | s3_multipart_uploads_parts | bucket_id                   | text                        | NO          | null                                            |
| storage      | s3_multipart_uploads_parts | key                         | text                        | NO          | null                                            |
| storage      | s3_multipart_uploads_parts | etag                        | text                        | NO          | null                                            |
| storage      | s3_multipart_uploads_parts | owner_id                    | text                        | YES         | null                                            |
| storage      | s3_multipart_uploads_parts | version                     | text                        | NO          | null                                            |
| storage      | s3_multipart_uploads_parts | created_at                  | timestamp with time zone    | NO          | now()                                           |
| vault        | decrypted_secrets          | id                          | uuid                        | YES         | null                                            |
| vault        | decrypted_secrets          | name                        | text                        | YES         | null                                            |
| vault        | decrypted_secrets          | description                 | text                        | YES         | null                                            |
| vault        | decrypted_secrets          | secret                      | text                        | YES         | null                                            |
| vault        | decrypted_secrets          | decrypted_secret            | text                        | YES         | null                                            |
| vault        | decrypted_secrets          | key_id                      | uuid                        | YES         | null                                            |
| vault        | decrypted_secrets          | nonce                       | bytea                       | YES         | null                                            |
| vault        | decrypted_secrets          | created_at                  | timestamp with time zone    | YES         | null                                            |
| vault        | decrypted_secrets          | updated_at                  | timestamp with time zone    | YES         | null                                            |
| vault        | secrets                    | id                          | uuid                        | NO          | gen_random_uuid()                               |
| vault        | secrets                    | name                        | text                        | YES         | null                                            |
| vault        | secrets                    | description                 | text                        | NO          | ''::text                                        |
| vault        | secrets                    | secret                      | text                        | NO          | null                                            |
| vault        | secrets                    | key_id                      | uuid                        | YES         | null                                            |
| vault        | secrets                    | nonce                       | bytea                       | YES         | vault._crypto_aead_det_noncegen()               |
| vault        | secrets                    | created_at                  | timestamp with time zone    | NO          | CURRENT_TIMESTAMP                               |
| vault        | secrets                    | updated_at                  | timestamp with time zone    | NO          | CURRENT_TIMESTAMP                               |