# Notes

- Campaign main data does not return the send/sent date
- I think if campaigns are 'send immediately' it doesn't store the sent_at date
- We need sent dates - like startDate and endDate to show when it scheduled from and to e.g 12pm - 1pm
- A new endpoint would probably be best, send all campaigns with just title, startDate, endDate, maybe description and state - a lot of data is currently sent to the /communications endpoint that we don't need
