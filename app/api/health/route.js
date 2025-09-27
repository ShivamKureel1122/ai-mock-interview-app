
export async function GET() {
    const date = new Date();
    const timeInIndia = date.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false // change to 24-hour format
    });
    console.log(`[HEALTH CHECK] Ping at ${timeInIndia}`);
    return new Response("OK", { status: 200 });
}