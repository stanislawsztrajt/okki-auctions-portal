<template>
	<div :class="`${ isCallingShow ? 'mt-4' : ''}`">
		<div v-if="receivingCall && !callAccepted" class="">
			<div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
				<div class="flex items-end justify-center  min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
					<div style="background-color: rgba(107, 114, 128, 0.75 );" class="fixed inset-0 transition-opacity" aria-hidden="true"></div>
					<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
					<div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
						<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
							<div class="sm:flex sm:items-start">
								<div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
										<path stroke-linecap="round" stroke-linejoin="round" d="M21 3l-6 6m0 0V4m0 5h5M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
									</svg>
								</div>
								<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
									<h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Czy chcesz dołączyć do rozmowy?</h3>
									<div class="mt-2">
										<p class="text-sm text-gray-500">
											Dołączysz do rozmowy z użytkownikiem
										</p>
									</div>
								</div>
							</div>
						</div>
						<div class="pb-6 pt-0 p-4 flex flex-col md:flex-row justify-center">
							<button
								type="button"
								class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
								@click="answerCall({video: true, audio: true})"
							>
								Dołącz z kamerką
							</button>
							<button
								type="button"
								class="w-full inline-flex mt-2 md:mt-0 justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
								@click="answerCall({video: false, audio: true})"
							>
								Dołącz bez kamerki
							</button>
							<div class="mt-2 md:mt-0"></div>
							<button @click="cancelCall" type="button" class="w-full x inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
								Odrzuć
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class=" h-5/6 flex flex-col justify-center" v-show="isCallingShow">
			<div class="w-full flex flex-col items-center" id="streams">
				<div v-if="videosLength === 1" class="mt-4">
					Czekanie na użytkownika...
				</div>
			</div>
			<div class="flex flex-row justify-center items-end fixed w-full h-screen top-0">
				<div class="flex flex-row items-center justify-center mb-2">
					<button
						:class="`call_button cursor-pointer duration-100 ${isNotMute ? 'text-blue-400 border-blue-400 hover:text-gray-400 hover:border-gray-400' : 'hover:text-blue-400 hover:border-blue-400'}`"
						v-on="isNotMute ? { click: mute } : { click: unmute }"
					>
						<svg v-if="isNotMute" class="h-6 w-6"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
							<path stroke="none" d="M0 0h24v24H0z"/>  <rect x="9" y="2" width="6" height="11" rx="3" />  <path d="M5 10a7 7 0 0 0 14 0" />  <line x1="8" y1="21" x2="16" y2="21" />  <line x1="12" y1="17" x2="12" y2="21" />
						</svg>
						<svg v-else class="h-6 w-6" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">
							<line x1="1" y1="1" x2="23" y2="23" />  <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />  <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />  <line x1="12" y1="19" x2="12" y2="23" />  <line x1="8" y1="23" x2="16" y2="23" />
						</svg>
					</button>

					<button
						:class="`call_button ml-4 cursor-pointer duration-100 ${isStream ? 'text-blue-400 border-blue-400 hover:text-gray-400 hover:border-gray-400' : 'hover:text-blue-400 hover:border-blue-400'}`"
						v-on="isStream ? { click: stopStream } : { click: startStream }"
					>
						<svg v-if="isStream" class="h-6 w-6"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <polygon points="23 7 16 12 23 17 23 7" />  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>
						<svg v-else class="h-6 w-6"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10" />  <line x1="1" y1="1" x2="23" y2="23" /></svg>
					</button>

					<button class="border text-white bg-red-600 border-red-600 ml-4 p-4 rounded-full button-animation-hover cursor-pointer" @click="leaveCall">
						<svg class="h-6 w-6 mt-1" style="transform: rotate(140deg)" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /></svg>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import io from 'socket.io-client';
import Peer from 'simple-peer'
import { user } from '../constants/const-variables';

const serverURL = 'http://localhost:5000'
// const serverURL = 'https://okki-videochat.herokuapp.com'
const socket = io.connect(serverURL)

export default {
	props: {
		isCallingShow: Boolean,
	},
	data(){
		return{
			me: user.id,
			idToCall: this.$route.path.replace('/chat/', ''),
			stream: '',
			receivingCall: '',
			caller: '',
			callerSignal: '',
			callAccepted: false,
			callEnded: false,
			isCalling: false,
			isNotMute: true,
			isStream: false,
			isIdSent: false,

			isFirstStreamHasVideo: false,
			isSecondStreamHasVideo: false,
			name: '',

			videosLength: 0,


			connectionRef: {},
			used: false,
		}
	},
	created(){
		socket.on('endCall', (data) => {
			if(data){
				this.$router.go(0);
			}
		})

		socket.emit('setVideoChatId', user.id)

		socket.on('callUser', data =>{
			if(data.userIdFrom === this.idToCall){
				this.receivingCall = true;
				this.caller = data.from
				this.callerSignal = data.signal;
			}
		})
	},
	methods: {
		toggleIsCalling(){
			this.$emit('toggle-is-calling')
		},
		setTrueIsCalling(){
			this.$emit('set-true-is-calling')
		},
		stopStream(){
			this.isStream = false,
			this.stream.getVideoTracks()[0].enabled = false;
		},
		startStream(){
			this.isStream = true,
			this.stream.getVideoTracks()[0].enabled = true;
		},
		mute(){
			this.isNotMute = false;
			this.stream.getAudioTracks()[0].enabled = false;
		},
		unmute(){
			this.isNotMute = true;
			this.stream.getAudioTracks()[0].enabled = true;
		},
		addVideo(video, stream){
			this.videosLength++;
			const streams = document.getElementById('streams');
			video.srcObject = stream;
			video.play();

			streams.prepend(video)
		},
		async callUser(userMediaOptions){
			await navigator.mediaDevices.getUserMedia({video: true, audio: true})
			.then(stream =>{
				this.isStream = userMediaOptions.video ? true : false;

				this.stream = stream;
				this.isFirstStreamHasVideo = stream.getVideoTracks().length > 0 ? true : false;
				const video = document.createElement('video');
				video.muted = true;

				if(!userMediaOptions.video){
					this.stopStream()
				}

				this.addVideo(video, stream)
			})

			this.toggleIsCalling()
			this.isCalling = true;

			const peer = new Peer({
				initiator: true,
				trickle: false,
				stream: this.stream
			})

			peer.on('signal', data =>{
				socket.emit('callUser', {
					userToCall: this.idToCall,
					signalData: data,
					from: this.me,
				})
			})

			peer.on('stream', stream =>{
				const video = document.createElement('video');
				this.addVideo(video, stream)
			})

			socket.on('callAccepted', signal =>{
				this.isCalling = false;
				this.callAccepted = true;
				peer.signal(signal);
			})

			this.connectionRef.current = peer;

		},
		async answerCall(newUserMediaOptions){
			if(this.videosLength === 0){
				await navigator.mediaDevices.getUserMedia({video: true, audio: true})
				.then(stream =>{
					this.isStream = newUserMediaOptions.video ? true : false;

					this.stream = stream;
					this.isFirstStreamHasVideo = stream.getVideoTracks().length > 0 ? true : false;
					const video = document.createElement('video');
					video.muted = true;

					if(!newUserMediaOptions.video){
						this.stopStream()
					}

					this.addVideo(video, stream)
				})
			}

			this.setTrueIsCalling();
			this.isCalling = false;
			this.callAccepted = true;

			const peer = new Peer({
				initiator: false,
				trickele: false,
				stream: this.stream
			})

			peer.on('signal', data =>{
				socket.emit('answerCall', {
					signal: data,
					to: this.idToCall
				})
			})

			peer.on('stream', stream =>{
				const video = document.createElement('video');
				this.isSecondStreamHasVideo = stream.getVideoTracks().length > 0 ? true : false;

				this.addVideo(video, stream)
			})

			peer.signal(this.callerSignal);
			this.connectionRef.current = peer;
		},
		cancelCall(){
			socket.emit('endCall', {
				userToCall: this.idToCall,
				ended: true
			})
			this.$router.go(0);
			this.receivingCall = false;
			this.callAccepted = false;
			this.isCalling = false;
		},
		leaveCall(){
			socket.emit('endCall', {
				userToCall: this.idToCall,
				ended: true
			})
			socket.on('disconnect');
			// this.connectionRef.current.destroy();
			this.$router.go(0);
		}
	},
}
</script>

<style>
	.call_button{
		@apply border text-gray-400 border-gray-400 p-4 rounded-full
	}

	video{
		@apply border-4 border-white
	}

	video:first-child{
		@apply w-11/12 md:w-2/3 lg:w-7/12 xl:w-1/2 2xl:w-5/12
	}

	video:nth-child(2){
		@apply mt-4 w-64
	}
	/* video{
		@apply border-8 border-white
	}

	video:first-child{
		@apply w-7/12
	}

	video:nth-child(2){
		@apply mt-4 w-44
	} */
</style>