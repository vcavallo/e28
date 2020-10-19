
## note to self

- symlink new directories to `/var/www`
- change `/var/www/current` symlink to point to currently-hosted app in this directory (like `sudo ln -s ~/code/e28/game-vue /var/www/current`)
- OR:
- create an apache host for the same
- create a `/etc/hosts` entry for the same
- consider scripting all the above
- OR:
- using subdomains, add entry to `/etc/apache2/sites-available/001-practice.conf`, add an entry for this subdomain to `/etc/hosts`, symlink the wanted app from this directory to `/var/www/...` and update the .conf entry for this symlink.

apache is listening on port 9999 (`/etc/apache2/ports.conf`). using `practice.loc:9999` for now.
