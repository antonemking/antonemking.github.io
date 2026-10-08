(() => {
  "use strict";
  const root = document.getElementById("trace-viewer");
  if (!root) return;
  const byId = id => document.getElementById(id);
  const back = byId("trace-back"), next = byId("trace-next"), play = byId("trace-play");
  const range = byId("trace-range"), position = byId("trace-position");
  const descriptions = {
    agent_start: "The harness starts a run with a working directory, provider, and model.",
    turn_start: "A model turn begins.",
    context_snapshot: "This is the context the harness is about to send: messages, system instructions, and available tools.",
    message_update: "A piece of the model response arrives. It may contain text or a proposed tool call.",
    tool_execution_start: "The harness begins the requested file read. The model proposed the call; the tool executes it.",
    tool_execution_end: "The tool returns the numbered file contents. This result is available to the next model turn.",
    turn_end: "The model turn finishes and its outcome is recorded.",
    agent_end: "The run finishes. The recorded reason and usage values belong to the scripted fixture."
  };
  let events = [], index = 0, timer;
  const pause = () => { clearInterval(timer); timer = undefined; play.textContent = "Play"; };
  const render = () => {
    const event = events[index];
    byId("trace-title").textContent = event.type.replaceAll("_", " ");
    byId("trace-explanation").textContent = descriptions[event.type] || "A recorded harness event.";
    byId("trace-payload").textContent = JSON.stringify(event, null, 2);
    position.textContent = `Event ${index + 1} of ${events.length}`;
    range.value = String(index);
    back.disabled = index === 0;
    next.disabled = index === events.length - 1;
    for (const [i, item] of [...byId("trace-list").children].entries()) item.dataset.current = String(i === index);
  };
  back.addEventListener("click", () => {pause(); if(index > 0) index--; render();});
  next.addEventListener("click", () => {pause(); if(index < events.length - 1) index++; render();});
  range.addEventListener("input", () => {pause(); index = Number(range.value); render();});
  play.addEventListener("click", () => {
    if (timer) return pause();
    if (index === events.length - 1) {index = 0; render();}
    play.textContent = "Pause";
    timer = setInterval(() => {index++; render(); if(index === events.length - 1) pause();}, 900);
  });
  document.addEventListener("visibilitychange", () => {if(document.hidden) pause();});
  fetch(root.dataset.traceUrl).then(response => {
    if(!response.ok) throw new Error("Trace unavailable");
    return response.json();
  }).then(trace => {
    if(!Array.isArray(trace.events) || !trace.events.length) throw new Error("Trace is empty");
    events = trace.events;
    for(const event of events) {
      const item = document.createElement("li");
      item.textContent = event.type.replaceAll("_", " ");
      byId("trace-list").append(item);
    }
    range.max = String(events.length - 1);
    range.disabled = play.disabled = false;
    render();
  }).catch(error => {position.textContent = error.message + ". Use the JSON link below.";});
})();
