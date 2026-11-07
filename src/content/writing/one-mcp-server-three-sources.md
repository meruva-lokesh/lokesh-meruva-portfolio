---
title: One MCP server, three data sources
description: "How nine small tools and one router let Claude answer questions across Google Sheets, SQLite and PDF invoices in a single conversation."
summary: "How 9 small tools and a router let Claude answer questions across Google Sheets, SQLite and PDF invoices."
ogDescription: "Nine small tools and one router let Claude work across Google Sheets, SQLite and PDF invoices."
date: 2026-11-03
readMinutes: 2
order: 2
image: /assets/images/lokesh/work-mcp.jpg
repo: https://github.com/meruva-lokesh/Multi-Tool-MCP-Server
---

Small businesses keep their data in three places: a spreadsheet of leads, a database of customers and a folder of PDF invoices.
Getting the full picture from an AI usually means copying from all three into a chat. I built a Model Context Protocol (MCP) server
that lets Claude read all of them in one conversation.

<figure>
  <img src="/assets/images/lokesh/work-mcp.webp" alt="Tablet showing Claude answering 'Give me a full business overview' using Google Sheets, SQLite and a PDF invoice" width="1530" height="880" loading="lazy" decoding="async" />
  <figcaption>One question, three sources: Sheets, SQLite and a PDF invoice.</figcaption>
</figure>

## Nine small tools

<div class="table-wrap">

| Tool | Source | What it does |
| --- | --- | --- |
| `sheets_read` | Google Sheets | Read any range as a table |
| `sheets_write` | Google Sheets | Append a row |
| `db_query` | SQLite | Run SELECT queries |
| `db_insert` | SQLite | Insert a new row |
| `db_list_tables` | SQLite | List tables and their columns |
| `pdf_list` | PDF folder | List the PDF files |
| `pdf_read` | PDF folder | Extract the full text of a PDF |
| `pdf_search` | PDF folder | Search every PDF for a keyword |
| `smart_query` | All three | Ask in plain English and it routes |

</div>

Each tool does one job and has a plain name and description. That matters more than it sounds: the model chooses tools by reading
those descriptions, so a vague one gets called at the wrong time.

## One router for the big questions

Some questions need everything, like "Give me a full business overview." `smart_query` takes the question in plain
English and sends it to the right source, or to all three at once. With the demo data, that answer pulls the 10 customers from
SQLite, the leads from the Google Sheet and the matching invoice from the PDF folder.

## Easy to extend

Every tool module registers on one shared FastMCP instance, so adding a data source means adding one file under
`tools/` without touching the others.

## Easy to try, safe to connect

- `setup_demo.py` creates a SQLite database with 10 sample customers and a sample invoice PDF.
- `test_server.py` covers the tools, so you can check everything before connecting real data.
- Credentials live in `.env` and a Google service account, never in the repository.
- Adding it to Claude Desktop is a single entry in `claude_desktop_config.json`.

## Next steps

The write tools only append rows and insert records. A confirmation step before any write, and a read-only switch for cautious
setups, would make it safer to hand to a business owner.
