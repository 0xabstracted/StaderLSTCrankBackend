cInstall pm2-logrotate to maintain logs for server.
```bash
pm2 install pm2-logrotate
```

Setup logrotate config 
```bash
pm2 set pm2-logrotate:max_size 10M         # Rotate log files when they exceed 10 MB
pm2 set pm2-logrotate:retain 30            # Keep logs for 30 days
pm2 set pm2-logrotate:compress true        # Compress rotated log files
pm2 set pm2-logrotate:rotateInterval 0 0 * * *  # Rotate logs daily at midnight
pm2 set pm2-logrotate:workerInterval 60   # Check every 60 seconds for rotation
```
