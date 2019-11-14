// byteConversion is called by logger() which is the module's exported function
//  return back bytes, kbs, mb, or gb
// takes in ctx.response.length in bytes
const byteConversion = size => {
  // object with b, kb, mb, gb values
  let units = { b: 1, kb: 1 << 10, mb: 1 << 20, gb: 1 << 30 };
  // find appropriate size (b, kb, mb, or gb) and divide to 2 decimal places. Example (1024 / units.kb).toFixed(2) --> 1kb
  if (size >= units.gb) {
    return `${(size / units.gb).toFixed(2)}gb`;
  } else if (size >= units.mb) {
    return `${(size / units.mb).toFixed(2)}mb`;
  } else if (size >= units.kb) {
    return `${(size / units.kb).toFixed(2)}kb`;
  } else {
    return `${size}b`;
  }
};

//  returns nothing, only writes to terminal with information on ctx
// calls byteConversion which returns data converted to appropriate type
// logs method, originalUrl, status, time to repond, data amount
const logger = async (ctx, next) => {
  //log request method and originalUrl
  process.stdout.write(`  --> ${ctx.method} ${ctx.originalUrl}\n`);
  const start = Date.now();
  const res = ctx.res;
  // wait for ctx to respond in another middleware
  await next();
  // once res is finished responding then log the the method, original url, status, time to respond and data length
  res.once("finish", () =>
    process.stdout.write(
      `  <-- ${ctx.method} ${ctx.originalUrl} ${ctx.status} ${Date.now() -
        start}ms ${byteConversion(Number(ctx.response.length))}\n`
    )
  );
};

module.exports = logger;
