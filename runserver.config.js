module.exports = {
  apps: [{
    name: "StaderLSTCrankBackend",
    script: "npm",
    args: "run start:prod",
    interpreter: "none",
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: false,
    max_memory_restart: "512M",
    env: {
      NODE_ENV: "production",
      PORT: 3050 // Adjust this port as needed
    },
    error_file: "/home/ubuntu/stader-labs/StaderLSTCrankBackend/error-logs/error.log", // Adjust this path
    out_file: "/home/ubuntu/stader-labs/StaderLSTCrankBackend/output-logs/output.log", // Adjust this path
    log_date_format: "YYYY-MM-DD HH:mm:ss"
  }]
};