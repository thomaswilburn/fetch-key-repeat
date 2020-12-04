# fetch-key-repeat

I run several little personal apps, like my RSS reader and podcast listener, and often want to synchronize their data across multiple devices. This server is a simple key/value store API that I use to export data from one place and import it in another. It's idiosyncratic, but it only needs to work for me.

1. POST a request to `/fetch-key-repeat/new` with the data you want to sync. You'll get back a JSON object with a `key` property.
1. On the importing device, GET from `/fetch-key-repeat/X`, where X is the `key` value from the export to retrieve the data.

Values are stored in the cache as a binary buffer for one hour, and must be less than 10KB in size.
