from datetime import datetime

# Insert time array here.
times = []
fmt_in = '%I:%M %p'
fmt_out = '%H:%M'
times = [datetime.strptime(t, fmt_in).strftime(fmt_out) for t in times]
