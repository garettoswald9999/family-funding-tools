# Province and territory program data (research draft, checked 2026-10-17)

One file for each province or territory (`<code>.json`). Each file has `code`, `province`, `last_checked`, `federal_note`, and `programs[]`.
Programs use the same fields as `data/programs.json` (slug, name, gov, what, amount, who, steps, docs, links), plus: `nickname` (plain name), `category`, `amount_verified`, `plain_language`, `last_checked`.
Federal programs (DTC, CDB, RDSP, CCB) are kept in programs.json and not copied here. Jordan's Principle is in every file. Inuit Child First is in NL, NT, NU and YT.
Text is written at about a grade 6 reading level.

## Amounts checked on official pages (2026-10-17)
- ON OAP: $6,600 to $65,000 a year. ON ACSD: $25 to $678 a month (from July 1, 2026).
- QC SEH: $241 a month ($2,892 a year). QC SEHNSE: $14,580 a year (Tier 1) or $9,696 a year (Tier 2).
- SK ASD-IF: up to $8,000 a year (under 6) or $6,000 a year (ages 6 to 11). SK CDS: up to $15,120 a year (from a FAQ PDF; publication date not confirmed).
- AB ADAP: $1,740 a month. AB AISH: $1,940 a month (from July 2, 2026).
- NS DFSC: up to $4,800 a month in total ($2,800 respite plus $2,000 enhanced).

## Not verified / gaps
- MB MSPD amounts come from a non-government site. They are marked as NOT verified.
- PEI autism funding is based on hours (20 to 25 hours a week). No dollar maximum was found.
- No dollar amounts were found for: AB FSCD, AB AADL, MB CDS, MB Rent Assist, NB family supports, NL SCWA, ON SSAH, PE AccessAbility, YT, NT or NU.
- The income support rate for each province was not collected, except AB.
- Not researched yet: housing and rent help outside BC and MB; the ON, NB and NL child benefits; equipment and AAC funding outside AB and ON (for example SK Aids to Independent Living, QC RAMQ communication aids, BC At Home); respite as a separate program in most provinces; and province-specific First Nations or Inuit programs.
- NU: we found no autism or child disability funding program. Families rely on Inuit Child First, Jordan's Principle and Family Services.
- NT: the respite program is run by non-profits (NWTDC, Inclusion NWT). The only government source is an inventory PDF.
- BC: the file reuses the BC entries from programs.json. It also has one new CYSN family-support entry, which links to the BC financial supports page because the CYSN page returned 404.
- NB Preschool Autism URL is a long gnb.ca renderer link. It loads (200) but may change.
- curl got 403 from yukon.ca pages. Two of them loaded with the web fetch tool. The Yukon OT/PT page was not re-checked.
