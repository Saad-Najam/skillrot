/**
 * A built-in lecture so the app can be demonstrated with no file to hand.
 *
 * It goes through the normal paste-text upload path rather than a special case,
 * which keeps the demo honest: whatever a judge sees here is the same pipeline a
 * student's own PDF takes.
 */

export const DEMO_MATERIAL_TITLE = 'Operating Systems: Process Scheduling';

export const DEMO_MATERIAL_TEXT = `Operating Systems: Process Scheduling

1. Why scheduling exists
A modern computer runs far more processes than it has CPU cores. The operating
system must therefore decide, many thousands of times per second, which runnable
process gets the processor next. That decision is made by the scheduler, and the
policy it follows is called the scheduling algorithm. The part of the kernel that
performs the actual switch from one process to another is the dispatcher, and the
time it takes is dispatch latency.

2. Process states
A process moves between five states. It is new while being created, ready when it
is waiting for the CPU, running when it holds a core, waiting when it is blocked
on input or output, and terminated once it finishes. Only the transition from
ready to running is under the scheduler's control; the others are driven by the
process itself or by hardware. A process that spends most of its life waiting on
devices is called I/O-bound, while one that mostly computes is CPU-bound. A good
scheduler mixes both so that neither the processor nor the disks sit idle.

3. Preemptive versus non-preemptive scheduling
Under non-preemptive scheduling a process keeps the CPU until it blocks or exits.
This is simple and cheap, but one long computation can starve every other
process. Under preemptive scheduling the kernel can take the CPU away when a
timer interrupt fires or a higher-priority process becomes ready. Preemption is
what makes a system feel responsive, and it is what every general-purpose
operating system uses today. The cost is a context switch: the kernel saves the
registers, program counter and memory mapping of the outgoing process and
restores those of the incoming one. Context switches are pure overhead, so a
scheduler that preempts too often wastes the very time it is trying to share.

4. The classic algorithms
First-Come First-Served runs processes in arrival order. It is trivially fair in
one sense but suffers the convoy effect, where a single long job delays many
short ones. Shortest Job First always picks the process with the smallest next
CPU burst, and it is provably optimal for average waiting time, but it requires
knowing burst lengths in advance, which is impossible in general; real systems
estimate them with an exponential average of past bursts. Round Robin gives each
process a fixed time quantum, then moves it to the back of the queue. Round Robin
is the standard interactive policy, and the quantum is the key tuning knob: too
large and it degenerates into First-Come First-Served, too small and context
switch overhead dominates. Priority scheduling runs the highest-priority runnable
process, which risks starvation of low-priority work; the usual remedy is aging,
where a process's priority is raised the longer it waits.

5. Multi-level feedback queues
Real schedulers combine these ideas. A multi-level feedback queue holds several
run queues at different priorities, each with its own quantum. A new process
enters the highest-priority queue with the shortest quantum. If it uses its whole
quantum it is assumed to be CPU-bound and is demoted to a lower queue with a
longer quantum; if it blocks early it is assumed to be interactive and stays
high. This approximates Shortest Job First without ever being told burst lengths,
which is why variants of it run in Linux, Windows and macOS.

6. Judging a scheduler
Five metrics matter. CPU utilisation is the fraction of time the processor does
useful work. Throughput is completed processes per unit time. Turnaround time is
submission to completion. Waiting time is the total time spent in the ready
queue, and it is the metric a scheduler can actually minimise, since turnaround
also includes I/O the scheduler does not control. Response time is submission to
first output, and it is what an interactive user perceives as speed. These
metrics conflict: maximising throughput favours long uninterrupted bursts, while
minimising response time favours frequent preemption. Every real scheduler is a
compromise between them, tuned for the workload the system expects.`;
