# Project Overview

## What this is

ORU Social FemTech is an AI-powered women's healthcare access and
reproductive-health education initiative by Online Riches Unleashed (Pty) Ltd
(trading as ORU Social), aimed at women and girls across Africa — including users
with low digital literacy, limited bandwidth, disabilities, or older mobile devices.

This repository currently contains the **Women's Health portal front-end prototype**:
a single-page Next.js site implementing the approved Stitch home-page design (v2).

## People

- **Project owner:** Florida N. Mpengesi, Founder and CEO
- **Technical lead:** Abayomi Okemakinde

## Intended product modules (target, not current state)

1. **Women's Health Portal** — entry point with 9 clinical categories. *Prototype UI done; content is static mockup copy.*
2. **Healthcare Provider Discovery** — searchable directory of verified providers. *Blocked: no authorised provider data source. UI shows labelled illustrative entries.*
3. **AI-Assisted Healthcare Navigation** — bounded, source-grounded assistant. *Blocked: no approved sources, model, or safety review. UI shows a static preview only.*
4. **Women's Health Education / EdTech** — guides now read live from Supabase
   (published-only) with an explicit service-error state. *No progress tracking
   or review workflow exists; the `body`-line mapping convention needs
   governance.*
5. **Telehealth Integration** — reuse of existing booking/video flows. *Not started; no existing capability found to integrate with.*
6. **Admin and Content Governance** — restricted editorial workflows. *Not started.*

## MVP boundary (agreed smallest demonstrable slice)

A clearly labelled, read-only education portal: category browse, resource cards with
review metadata, search with empty/error/reset states, and a non-diagnostic safety
notice — backed only by static content until an approved content source exists.
Provider search, booking, AI, and admin remain visibly disconnected.

## Non-goals for this prototype

- No diagnosis, treatment advice, prescriptions, or emergency triage.
- No user accounts, data collection, or health-data storage.
- No duplicate booking/video/EMR systems.

## Key references

- Engineering rules and full scope: `ORU_Social_FemTech_Master_Engineering_Prompt.md` (untracked working copy)
- Design source: `stitch_oru_femtech_platform_implementation (1).zip` (untracked working copy)
- Current state and risks: `docs/current-status.md`
- Next steps and approval blockers: `docs/development-roadmap.md`
