const url = "https://mojmqmknfrshuxlmpkya.supabase.co/rest/v1/content_programs?select=*";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vam1xbWtuZnJzaHV4bG1wa3lhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzMDIzMjUsImV4cCI6MjA4NTg3ODMyNX0.eCf9Ve86ghtYYyG2o89e_tRuNBk8PN8SvnqPQmOBo74";

async function testSupabase() {
    try {
        console.log("Fetching...", url);
        const response = await fetch(url, {
            headers: {
                "apikey": key,
                "Authorization": `Bearer ${key}`
            }
        });

        console.log("Status:", response.status);
        if (!response.ok) {
            console.log("Response text:", await response.text());
        } else {
            const data = await response.json();
            console.log("Data length:", data.length);
            console.log("First item:", data[0]);
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

testSupabase();
